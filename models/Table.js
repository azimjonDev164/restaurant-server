const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  seat: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true }, // ✅ true = free, false = taken
});

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;
