const express = require("express");
const router = express.Router();
const {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
} = require("../controllers/orderItemController");

// ✅ Create a new order item
router.post("/", createOrderItem);

// ✅ Get all order items
router.get("/", getAllOrderItems);

// ✅ Get a single order item by ID
router.get("/:id", getOrderItemById);

// ✅ Update order item quantity
router.put("/:id", updateOrderItem);

// ✅ Delete an order item
router.delete("/:id", deleteOrderItem);

module.exports = router;
