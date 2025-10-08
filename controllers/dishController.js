const Dish = require("../models/Dish");
const fs = require("fs");
const path = require("path");

const createDish = async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    console.log(name, price, categoryId);
    if (!name || !price || !categoryId) {
      return res
        .status(400)
        .json({ message: "Name, price, and category are required!" });
    }

    const existingDish = await Dish.findOne({ name }).lean();
    if (existingDish) {
      return res.status(409).json({ message: "Dish already exists" });
    }

    const newDish = await Dish.create({
      name,
      price,
      category: categoryId,
      image,
    });
    console.log("✅ Dish created successfully:", newDish);

    return res.status(201).json(newDish);
  } catch (error) {
    console.error("Error creating dish:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find().populate("category", "name");

    if (!dishes || dishes.length === 0) {
      return res.status(404).json({ message: "No dishes found" });
    }

    return res.status(200).json(dishes);
  } catch (error) {
    console.error("Error fetching dishes:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getDishesByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const dishes = await Dish.find({ category: categoryId }).populate(
      "category",
      "name"
    );

    if (!dishes || dishes.length === 0) {
      return res
        .status(404)
        .json({ message: "No dishes found for this category" });
    }

    return res.status(200).json(dishes);
  } catch (error) {
    console.error("Error fetching category dishes:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateDish = async (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;

  try {
    const dish = await Dish.findById(id);
    if (!dish) return res.status(404).json({ message: "Dish not found" });

    // Replace image if new one uploaded
    if (req.file) {
      if (dish.image) {
        const oldImagePath = path.join(__dirname, "..", dish.image);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      dish.image = `/uploads/${req.file.filename}`;
    }

    dish.name = name || dish.name;
    dish.price = price || dish.price;
    dish.category = category || dish.category;

    await dish.save();
    return res.status(200).json(dish);
  } catch (error) {
    console.error("Error updating dish:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteDish = async (req, res) => {
  const { id } = req.params;

  try {
    const dish = await Dish.findById(id);
    if (!dish) return res.status(404).json({ message: "Dish not found" });

    // Delete image file if exists
    if (dish.image) {
      const imagePath = path.join(__dirname, "..", dish.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await Dish.findByIdAndDelete(id);
    return res.status(200).json({ message: "✅ Dish deleted successfully!" });
  } catch (error) {
    console.error("Error deleting dish:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createDish,
  getAllDishes,
  getDishesByCategory,
  updateDish,
  deleteDish,
};
