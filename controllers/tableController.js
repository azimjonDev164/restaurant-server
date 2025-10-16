const Table = require("../models/Table");
const fs = require("fs");
const path = require("path");

const createTable = async (req, res) => {
  const { number, seat } = req.body;

  try {
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const existingTable = await Table.findOne({ number, seat });

    if (existingTable) {
      return res.status(409).json({ message: "Table already exists!" });
    }

    const newTable = await Table.create({
      number,
      seat,
      image,
    });

    return res.status(200).json(newTable);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllTables = async (req, res) => {
  try {
    const tables = await Table.find();

    if (tables.length === 0) {
      return res.status(200).json({ message: "No Tables" });
    }

    return res.status(200).json(tables);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getTable = async (req, res) => {
  const { id } = req.params;

  try {
    const table = await Table.findById(id);
    if (!table) return res.status(404).json({ message: "Table not found" });

    return res.status(200).json(table);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTableStatus = async (req, res) => {
  const { id } = req.params;
  const { isAvailable } = req.body;

  try {
    const updated = await Table.findById(id);
    if (!updated) {
      return res.status(404).json({ message: "Table not found" });
    }

    if (req.file) {
      if (updated.image) {
        const oldImagePath = path.join(__dirname, "..", updated.image);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      updated.image = `/uploads/${req.file.filename}`;
    }

    updated.isAvailable = isAvailable;
    await updated.save();

    return res.status(200).json(updated);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getAvailableTables = async (req, res) => {
  try {
    const availableTables = await Table.find({ isAvailable: true });

    if (availableTables.length === 0) {
      return res.status(200).json({ message: "No available tables right now" });
    }

    return res.status(200).json(availableTables);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTable = async (req, res) => {
  const { id } = req.params;

  try {
    const table = await Table.findById(id);
    if (!table) return res.status(404).json({ message: "Table not found" });

    await Table.findByIdAndDelete(id);
    return res.status(200).json({ message: "✅ Table deleted successfully!" });
  } catch (error) {
    console.error("Error deleting table:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createTable,
  getAllTables,
  getAvailableTables,
  updateTableStatus,
  deleteTable,
  getTable,
};
