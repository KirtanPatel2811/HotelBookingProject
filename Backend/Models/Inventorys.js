const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const InventorysSchema = new mongoose.Schema({
  ItemID: {
    type: Number,
    unique: true,
  },
  ItemName: {
    type: String,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
});

InventorysSchema.plugin(AutoIncrement, { inc_field: "ItemID" });

const Inventorys = mongoose.model("Inventorys", InventorysSchema);

module.exports = Inventorys;
