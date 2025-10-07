const express = require("express");
const {
  createReservation,
  getUserReservations,
  updateStatus,
  cancelReservation,
} = require("../controllers/reservationController");

const router = express.Router();

router.post("/", createReservation);
router.get("/:userId", getUserReservations);
router.put("/:id", updateStatus);
router.patch("/:id/cancel", cancelReservation);

module.exports = router;
