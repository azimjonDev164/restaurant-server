const OrderItem = require("../models/OrderItem");

// ✅ Create an order item
const createOrderItem = async (req, res) => {
  try {
    const { orderId, dishId, quantity } = req.body;

    const orderItem = await OrderItem.create({
      order: orderId,
      dish: dishId,
      quantity: quantity || 1,
    });

    res.status(201).json({
      message: "✅ Order item created successfully",
      orderItem,
    });
  } catch (error) {
    console.error("❌ Error creating order item:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all order items
const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.find()
      .populate("order")
      .populate("dish");
    res.status(200).json(orderItems);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get a single order item by ID
const getOrderItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderItem = await OrderItem.findById(id)
      .populate("order")
      .populate("dish");

    if (!orderItem) {
      return res.status(404).json({ message: "Order item not found" });
    }

    res.status(200).json(orderItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update an order item
const updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const updatedItem = await OrderItem.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Order item not found" });
    }

    res.status(200).json({
      message: "✅ Order item updated successfully",
      updatedItem,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete an order item
const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await OrderItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Order item not found" });
    }

    res.status(200).json({ message: "🗑️ Order item deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
};
