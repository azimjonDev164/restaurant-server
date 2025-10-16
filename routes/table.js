const express = require("express");
const {
  createTable,
  getAllTables,
  getAvailableTables,
  updateTableStatus,
  deleteTable,
  getTable,
} = require("../controllers/tableController");
const router = express.Router();
const upload = require("../middleware/upload");

router.post("/", upload.single("image"), createTable);
router.get("/", getAllTables);
router.get("/:id", getTable);
router.put("/available", getAvailableTables);
router.put("/:id", upload.single("image"), updateTableStatus);
router.delete("/:id", deleteTable);

module.exports = router;
