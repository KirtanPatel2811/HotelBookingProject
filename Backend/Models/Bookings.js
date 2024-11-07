const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const BookingsSchema = new mongoose.Schema({
  BookingID: {
    type: Number,
    unique: true,
  },
  UserID: {
    type: Number,
    required: true,
  },
  RoomID: {
    type: Number,
    required: true,
  },
  CheckInDate: {
    type: Date,
    required: true,
  },
  CheckOutDate: {
    type: Date,
    required: true,
  },
  TotalPrice: {
    type: Number,
    required: true,
  },
  BookingStatus: {
    type: String,
    required: true,
  },
  PaymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    required: true,
  },
  BookingDate: {
    type: Date,
    default: Date.now,
  },
});

BookingsSchema.plugin(AutoIncrement, { inc_field: "BookingID" });

const Bookings = mongoose.model("Bookings", BookingsSchema);

module.exports = Bookings;
