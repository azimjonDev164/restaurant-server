const Menu = require("../models/Menu");
const Category = require("../models/Category");
const Dish = require("../models/Dish");

// Create a new menu
const createMenu = async (req, res) => {
  const { name } = req.body;

  try {
    const menu = await Menu.findOne({ name });

    if (menu) {
      return res.status(409).json({ message: "Menu already exists!" });
    }

    const newMenu = await Menu.create({ name });
    return res.status(201).json(newMenu);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all menus
const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    if (menus.length === 0) {
      return res.status(404).json({ message: "No menus found" });
    }

    return res.status(200).json(menus);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get one menu with its categories (and optionally dishes)
const getMenuWithCategories = async (req, res) => {
  const { menuId } = req.params;

  try {
    // Find categories that belong to this menu
    const categories = await Category.find({ menu: menuId })
      .populate("menu", "name") // Optional: include menu name
      .lean();

    // For each category, also include dishes
    const categoriesWithDishes = await Promise.all(
      categories.map(async (category) => {
        const dishes = await Dish.find({ category: category._id });
        return { ...category, dishes };
      })
    );

    return res.status(200).json({
      menuId,
      categories: categoriesWithDishes,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateMenu = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updateMenu = await Menu.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updateMenu) {
      return res.status(404).json({ message: "Table not found" });
    }

    return res.status(200).json(updateMenu);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteMenu = async (req, res) => {
  const { id } = req.params;

  try {
    const menu = await Menu.findById(id);
    if (!menu) return res.status(404).json({ message: "Menu not found" });

    await Menu.findByIdAndDelete(id);
    return res.status(200).json({ message: "✅ Menu deleted successfully!" });
  } catch (error) {
    console.error("Error deleting Menu:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createMenu,
  getAllMenus,
  getMenuWithCategories,
  deleteMenu,
  updateMenu,
};
