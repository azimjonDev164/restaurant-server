const express = require("express");
const {
  createMenu,
  getAllMenus,
  getMenuWithCategories,
} = require("../controllers/menuController");

const router = express.Router();

router.post("/", createMenu);
router.get("/", getAllMenus);
router.get("/:menuId", getMenuWithCategories);

module.exports = router;
