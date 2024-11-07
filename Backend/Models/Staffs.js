const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const StaffsSchema = new mongoose.Schema({
  StaffID: {
    type: Number,
    unique: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
  },
  Position: {
    type: String,
    required: true,
  },
  JoiningDate: {
    type: Date,
    required: true,
  },
  Salary: {
    type: Number,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  Age: {
    type: Number,
  },
});

// Pre-save hook to calculate age before saving
StaffsSchema.pre("save", function (next) {
  const staff = this;

  if (staff.DOB) {
    const currentDate = new Date();
    const ageDiff = currentDate.getFullYear() - staff.DOB.getFullYear();
    const monthDiff = currentDate.getMonth() - staff.DOB.getMonth();
    const dayDiff = currentDate.getDate() - staff.DOB.getDate();

    let calculatedAge = ageDiff;

    // Adjust if the birthday hasn't happened yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      calculatedAge--;
    }

    staff.Age = calculatedAge;
  }

  next();
});

StaffsSchema.plugin(AutoIncrement, { inc_field: "StaffID" });

const Staffs = mongoose.model("Staffs", StaffsSchema);

module.exports = Staffs;
