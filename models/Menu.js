const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
