const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["PENDING", "PREPARING", "SERVED", "CANCELLED"],
      default: "PENDING",
    },
     reservation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
      required: false, // optional in case orders can be made without reservation
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
