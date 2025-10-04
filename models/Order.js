const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["PENDING", "PREPARING", "SERVED", "CANCELLED"],
      default: "PENDING",
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
