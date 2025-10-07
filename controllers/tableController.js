const Table = require("../models/Table");

// Table.createTable(number)
// Table.getAllTables()
// Table.getAvailableTables()

const createTable = async (req, res) => {
  const { number } = req.body;

  try {
    const existingTable = await Table.findOne({ number });

    if (existingTable) {
      return res.status(409).json({ message: "Table already exists!" });
    }

    const newTable = await Table.create({
      number,
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

const updateTableStatus = async (req, res) => {
  const { id } = req.params;
  const { isAvailable } = req.body;

  try {
    const updatedTable = await Table.findByIdAndUpdate(
      id,
      { isAvailable },
      { new: true }
    );

    if (!updatedTable) {
      return res.status(404).json({ message: "Table not found" });
    }

    return res.status(200).json(updatedTable);
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

module.exports = {
  createTable,
  getAllTables,
  getAvailableTables,
  updateTableStatus,
};
