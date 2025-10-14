const Reservation = require("../models/Reservation");

// Reservation.createReservation(userId, tableId, startTime, endTime);
// Reservation.getUserReservations(userId);
// Reservation.updateStatus(reservationId, status);
// Reservation.cancelReservation(reservationId);

const createReservation = async (req, res) => {
  const { userId, tableId, startTime, endTime } = req.body;
  console.log(req.body);

  try {
    const existing = await Reservation.findOne({
      table: tableId,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
      status: { $ne: "CANCELLED" },
    });

    if (existing) {
      return res
        .status(409)
        .json({ message: "Table is already reserved for that time." });
    }

    const reservation = await Reservation.create({
      user: userId,
      table: tableId,
      startTime,
      endTime,
    });

    return res.status(201).json(reservation);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("table")
      .populate("user");

    if (reservations.length === 0) {
      return res.status(200).json({ message: "No reservations." });
    }

    return res.status(200).json(reservations);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllReservationsByTableId = async (req, res) => {
  const { tableId } = req.params;

  try {
    const reservations = await Reservation.find({ table: tableId })
      .populate("table", "name number")
      .populate("user", "name email")
      .sort({ startTime: 1 });

    // Always return an array — even if empty
    return res.status(200).json(reservations);
  } catch (error) {
    console.error("❌ Error fetching reservations:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserReservations = async (req, res) => {
  const { userId } = req.params;

  try {
    const reservations = await Reservation.find({ user: userId })
      .populate("table")
      .populate("user");

    if (reservations.length === 0) {
      return res
        .status(200)
        .json({ message: "No reservations found for this user." });
    }

    return res.status(200).json(reservations);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await Reservation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(400).json({ message: "Reservation doesn't exist!" });
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const cancelReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await Reservation.findByIdAndUpdate(id, {
      status: "CANCELLED",
    });

    if (!updated) {
      return res.status(400).json({ message: "Reservation doesn't exist!" });
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getUserReservations,
  updateStatus,
  cancelReservation,
  getAllReservationsByTableId,
};
