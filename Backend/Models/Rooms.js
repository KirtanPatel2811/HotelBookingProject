const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const RoomsSchema = new mongoose.Schema({
  RoomID: {
    type: Number,
    unique: true,
  },
  RoomName: {
    type: String,
    required: true,
    unique: true,
  },
  RoomType: {
    type: String,
    required: true,
  },
  NumberOfBeds: {
    type: Number,
    required: true,
  },
  PricePerNight: {
    type: Number,
    required: true,
  },
  Availability: {
    type: Boolean,
    required: true,
  },

  Description: {
    type: String,
    required: true,
  },
  Images: [String],
});

RoomsSchema.plugin(AutoIncrement, { inc_field: "RoomID" });
const Rooms = mongoose.model("Rooms", RoomsSchema);

module.exports = Rooms;
