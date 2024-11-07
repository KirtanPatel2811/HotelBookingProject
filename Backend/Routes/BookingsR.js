const express = require("express");
const mongoose = require("mongoose");
const Bookings = require("../Models/Bookings");

const router = express.Router();

// Add a new booking
router.post("/addBooking", async (req, res) => {
  const {
    UserID,
    RoomID,
    CheckInDate,
    CheckOutDate,
    TotalPrice,
    BookingStatus,
    PaymentStatus,
  } = req.body;

  // Basic validation
  if (
    !UserID ||
    !RoomID ||
    !CheckInDate ||
    !CheckOutDate ||
    !TotalPrice ||
    !BookingStatus ||
    !PaymentStatus
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const booking = new Bookings({
      UserID,
      RoomID,
      CheckInDate,
      CheckOutDate,
      TotalPrice,
      BookingStatus,
      PaymentStatus,
    });

    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Get all bookings
router.get("/allBookings", async (req, res) => {
  try {
    const bookings = await Bookings.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get booking by ID
router.get("/:id", async (req, res) => {
  try {
    const booking = await Bookings.findById(req.params.id);
    if (!booking)
      return res.status(404).json({ message: "Booking not found." });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a booking by ID
router.put("/:id", async (req, res) => {
  try {
    const booking = await Bookings.findById(req.params.id);
    if (!booking)
      return res.status(404).json({ message: "Booking not found." });

    // Update fields
    Object.assign(booking, req.body);

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a booking by ID
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Bookings.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.json({ message: "Booking deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
