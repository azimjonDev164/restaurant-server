require("dotenv").config();
const mongoose = require("mongoose");
const Dish = require("../models/Dish");
require("../models/Category");
const typesenseClient = require("./typesenseClient");

async function main() {
  try {
    // ✅ Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");

    // ✅ Run sync after connection
    await syncDishesToTypesense();
  } catch (err) {
    console.error("❌ Connection error:", err);
  } finally {
    mongoose.connection.close();
  }
}

async function syncDishesToTypesense() {
  try {
    const dishes = await Dish.find().populate("category");

    const records = dishes.map((d) => ({
      id: d._id.toString(),
      name: d.name,
      category: d.category ? d.category.name : "Unknown",
      price: d.price,
      image: d.image || "",
    }));

    const result = await typesenseClient
      .collections("dishes")
      .documents()
      .import(records);

    console.log("✅ Synced successfully:", result);
  } catch (err) {
    console.error("❌ Error syncing dishes:", err);
  }
}

main();
