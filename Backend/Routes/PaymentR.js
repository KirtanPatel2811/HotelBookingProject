const express = require("express");
const Payments = require("../Models/Payment");

const router = express.Router();

// Add a new payment
router.post("/addPayment", async (req, res) => {
  const { UserID, BookingID, PaymentMethod, Amount, Status, Notes } = req.body;

  // Basic validation
  if (!UserID || !BookingID || !PaymentMethod || !Amount || !Status) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided." });
  }

  try {
    const payment = new Payments({
      UserID,
      BookingID,
      PaymentMethod,
      Amount,
      Status,
      Notes,
    });

    const newPayment = await payment.save();
    res.status(201).json(newPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all payments
router.get("/allPayments", async (req, res) => {
  try {
    const payments = await Payments.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get payment by ID
router.get("/:id", async (req, res) => {
  try {
    const payment = await Payments.findById(req.params.id);
    if (!payment)
      return res.status(404).json({ message: "Payment not found." });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a payment by ID
router.put("/:id", async (req, res) => {
  try {
    const payment = await Payments.findById(req.params.id);
    if (!payment)
      return res.status(404).json({ message: "Payment not found." });

    // Update fields
    Object.assign(payment, req.body);

    const updatedPayment = await payment.save();
    res.json(updatedPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a payment by ID
router.delete("/:id", async (req, res) => {
  try {
    const payment = await Payments.findByIdAndDelete(req.params.id);
    if (!payment)
      return res.status(404).json({ message: "Payment not found." });

    res.json({ message: "Payment deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
