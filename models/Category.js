const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  menu: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
