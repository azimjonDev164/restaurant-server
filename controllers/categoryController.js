const Category = require("../models/Category");
const Dish = require("../models/Dish");

// ✅ Create Category
const createCategory = async (req, res) => {
  const { name, menu } = req.body;

  try {
    const existingCategory = await Category.findOne({ name, menu });

    if (existingCategory) {
      return res.status(409).json({ message: "Category already exists!" });
    }

    const newCategory = await Category.create({ name, menu });
    return res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get All Categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("menu", "name");

    if (categories.length === 0) {
      return res.status(404).json({ message: "No categories found!" });
    }

    return res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Category With Its Dishes
const getCategoryWithDishes = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id).populate("menu", "name");

    if (!category) {
      return res.status(404).json({ message: "Category not found!" });
    }

    const dishes = await Dish.find({ category: id });

    return res.status(200).json({
      category,
      dishes,
    });
  } catch (error) {
    console.error("Error fetching category with dishes:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryWithDishes,
};
