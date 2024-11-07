const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ServiceBookingsSchema = new mongoose.Schema({
  ServiceBookingID: {
    type: Number,
    unique: true,
  },
  BookingID: {
    type: Number,
    required: true,
    unique: true,
  },
  ServiceID: {
    type: Number,
    required: true,
  },
  ServiceName: {
    type: String,
    required: true,
  },
  NumberOfPersons: {
    type: Number,
    required: true,
  },
  BookingDate: {
    type: Date,
    required: true,
  },
  BookingTime: {
    type: String,
    required: true,
  },
  TotalPrice: {
    type: Number,
    required: true,
  },
});

ServiceBookingsSchema.plugin(AutoIncrement, { inc_field: "ServiceBookingID" });

const ServiceBookings = mongoose.model(
  "ServiceBookings",
  ServiceBookingsSchema
);

module.exports = ServiceBookings;
