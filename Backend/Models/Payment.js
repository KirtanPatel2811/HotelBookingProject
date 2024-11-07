const express = require("express");
const { default: mongoose } = require("mongoose");

const PaymentsScheema = new mongoose.Schema({
  PaymentID: {
    type: Number,
    unique: true,
    autoIncrement: true,
  },
  UserID: {
    type: Number,
    required: true,
  },
  BookingID: {
    type: Number,
    required: true,
  },
  PaymentMethod: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  PaymentDate: {
    type: Date,
    default: Date.now,
  },
  Status: {
    type: String,
    required: true,
  },
  Notes: {
    type: String,
  },
});

const Payments = mongoose.model("Payment", PaymentsScheema);

module.exports = Payments;
