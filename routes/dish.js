const express = require("express");
const {
  createDish,
  getAllDishes,
  getDishesByCategory,
  updateDish,
  deleteDish,
} = require("../controllers/dishController");
const upload = require("../middleware/upload");
const router = express.Router();

router.post("/", upload.single("image"), createDish);
router.get("/", getAllDishes);
router.get("/:categoryId", getDishesByCategory);
router.put("/:id", upload.single("image"), updateDish);
router.delete("/:id", deleteDish);

module.exports = router;
