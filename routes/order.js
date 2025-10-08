const express = require("express");
const {
  createOrder,
  getOrdersByUser,
  updateStatus,
  cancelOrder,
  getAllOrders,
} = require("../controllers/orderController");
const router = express.Router();

router.post("/", createOrder);
router.get("/:userId", getOrdersByUser);
router.get("/", getAllOrders);
router.put("/:id", updateStatus);
router.patch("/:id", cancelOrder);

module.exports = router;
