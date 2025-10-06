const express = require("express");
const {
  createDish,
  getAllDishes,
  getDishesByCategory,
  updateDish,
  deleteDish,
} = require("../controllers/dishController");
const router = express.Router();

router.post("/", createDish);
router.get("/", getAllDishes);
router.get("/:categoryId", getDishesByCategory);
router.put("/:id", updateDish);
router.delete("/:id", deleteDish);

module.exports = router;
