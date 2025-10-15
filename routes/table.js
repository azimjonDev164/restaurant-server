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

router.post("/", createTable);
router.get("/", getAllTables);
router.get("/:id", getTable);
router.put("/available", getAvailableTables);
router.put("/:id", updateTableStatus);
router.delete("/:id", deleteTable);

module.exports = router;
