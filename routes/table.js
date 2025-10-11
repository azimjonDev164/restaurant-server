const express = require("express");
const {
  createTable,
  getAllTables,
  getAvailableTables,
  updateTableStatus,
  deleteTable,
} = require("../controllers/tableController");
const router = express.Router();

router.post("/", createTable);
router.get("/", getAllTables);
router.put("/available", getAvailableTables);
router.put("/:id", updateTableStatus);
router.delete("/:id", deleteTable);

module.exports = router;
