const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ServicesSchema = new mongoose.Schema({
  ServiceID: {
    type: Number,
    unique: true,
  },
  ServiceName: {
    type: String,
    required: true,
    unique: true,
  },
  ServiceDescription: {
    type: String,
    required: true,
  },
  ServicePrice: {
    type: Number,
    required: true,
  },
});

ServicesSchema.plugin(AutoIncrement, { inc_field: "ServiceID" });

const Services = mongoose.model("Services", ServicesSchema);

module.exports = Services;
