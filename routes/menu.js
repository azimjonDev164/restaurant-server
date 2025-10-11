const express = require("express");
const {
  createMenu,
  getAllMenus,
  getMenuWithCategories,
  deleteMenu,
  updateMenu,
} = require("../controllers/menuController");

const router = express.Router();

router.post("/", createMenu);
router.get("/", getAllMenus);
router.get("/:menuId", getMenuWithCategories);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);

module.exports = router;
