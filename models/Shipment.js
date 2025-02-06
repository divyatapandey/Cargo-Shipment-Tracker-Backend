const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  containerId: { type: String, required: true, unique: true },
  route: { type: [String], required: true }, 
  currentLocation: { type: String, required: true },
  eta: { type: String, required: true },
  status: { type: String, enum: ["In Transit", "Delivered", "Pending"], default: "Pending" }
});

module.exports = mongoose.model("Shipment", shipmentSchema);
