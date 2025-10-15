const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");

const createOrder = async (req, res) => {
  const { userId, items, reservationId } = req.body;

  try {
    const order = await Order.create({
      user: userId,
      reservation: reservationId || null,
    });

    const orderItems = await Promise.all(
      items.map((item) =>
        OrderItem.create({
          order: order._id,
          dish: item.dishId,
          quantity: item.quantity || 1,
        })
      )
    );

    order.items = orderItems.map((item) => item._id);
    await order.save();

    res.status(201).json({ message: "✅ Order created successfully", order });
  } catch (error) {
    console.error("❌ Error creating order:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate({
        path: "items",
        populate: { path: "dish" },
      })
      .populate({
        path: "reservation",
        populate: { path: "table" },
      });

    console.log(orders);
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found!" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getOrdersByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const userOrders = await Order.find({ user: userId })
      .populate("user")
      .populate({
        path: "items",
        populate: { path: "dish" },
      })
      .populate({
        path: "reservation",
        populate: { path: "table" },
      });
    if (!userOrders || userOrders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    return res.status(200).json(userOrders);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const cancelOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const cancelledOrder = await Order.findByIdAndUpdate(
      id,
      { status: "CANCELLED" },
      { new: true }
    );

    if (!cancelledOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(cancelledOrder);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete an order item
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Order.findByIdAndDelete(id);

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
  createOrder,
  getAllOrders,
  getOrdersByUser,
  updateStatus,
  cancelOrder,
  deleteOrder,
};
