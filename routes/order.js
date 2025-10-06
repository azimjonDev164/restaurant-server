const express = require("express");
const {
  createOrder,
  getOrdersByUser,
  updateStatus,
  cancelOrder,
} = require("../controllers/orderController");
const router = express.Router();

router.post("/", createOrder);
router.get("/:id", getOrdersByUser);
router.put("/:id", updateStatus);
router.put("/:id", cancelOrder);

module.exports = router;
