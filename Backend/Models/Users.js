const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const UsersSchema = new mongoose.Schema({
  UserID: {
    type: Number,
    unique: true,
  },
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  DateOfBirth: {
    type: Date,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
  Registration_Date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

UsersSchema.plugin(AutoIncrement, { inc_field: "UserID" });

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
