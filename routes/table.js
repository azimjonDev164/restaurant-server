const express = require("express");
const {
  createTable,
  getAllTables,
  getAvailableTables,
  updateTableStatus,
} = require("../controllers/tableController");
const router = express.Router();

router.post("/", createTable);
router.get("/", getAllTables);
router.put("/available", getAvailableTables);
router.put("/:id", updateTableStatus);

module.exports = router;
