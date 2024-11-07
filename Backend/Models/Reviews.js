const mongoose = require("mongoose");

const AutoIncrement = require("mongoose-sequence")(mongoose);

const ReviewsSchema = new mongoose.Schema({
  ReviewID: {
    type: Number,
    unique: true,
  },
  RoomID: {
    type: Number,
    required: true,
  },
  UserID: {
    type: Number,
    required: true,
  },
  Comment: {
    type: String,
    required: true,
  },
  Rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

ReviewsSchema.plugin(AutoIncrement, { inc_field: "ReviewID" });

const Reviews = mongoose.model("Reviews", ReviewsSchema);

module.exports = Reviews;
