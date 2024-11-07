const express = require("express");
const ServiceBookings = require("../Models/ServiceBookings");

const router = express.Router();

// Add a new service booking
router.post("/addServiceBooking", async (req, res) => {
  const {
    BookingID,
    ServiceID,
    ServiceName,
    NumberOfPersons,
    BookingDate,
    BookingTime,
    TotalPrice,
  } = req.body;

  // Basic validation
  if (
    !BookingID ||
    !ServiceID ||
    !ServiceName ||
    !NumberOfPersons ||
    !BookingDate ||
    !BookingTime ||
    !TotalPrice
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const serviceBooking = new ServiceBookings({
      BookingID,
      ServiceID,
      ServiceName,
      NumberOfPersons,
      BookingDate,
      BookingTime,
      TotalPrice,
    });

    const newServiceBooking = await serviceBooking.save();
    res.status(201).json(newServiceBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all service bookings
router.get("/allServiceBookings", async (req, res) => {
  try {
    const serviceBookings = await ServiceBookings.find();
    res.json(serviceBookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get service booking by ID
router.get("/:id", async (req, res) => {
  try {
    const serviceBooking = await ServiceBookings.findById(req.params.id);
    if (!serviceBooking)
      return res.status(404).json({ message: "Service booking not found." });
    res.json(serviceBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a service booking by ID
router.put("/:id", async (req, res) => {
  try {
    const serviceBooking = await ServiceBookings.findById(req.params.id);
    if (!serviceBooking)
      return res.status(404).json({ message: "Service booking not found." });

    // Update fields
    Object.assign(serviceBooking, req.body);

    const updatedServiceBooking = await serviceBooking.save();
    res.json(updatedServiceBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a service booking by ID
router.delete("/:id", async (req, res) => {
  try {
    const serviceBooking = await ServiceBookings.findByIdAndDelete(
      req.params.id
    );
    if (!serviceBooking) {
      return res.status(404).json({ message: "Service booking not found." });
    }

    res.json({ message: "Service booking deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
