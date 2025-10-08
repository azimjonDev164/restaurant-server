const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryWithDishes,
} = require("../controllers/categoryController");

const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryWithDishes);

module.exports = router;
