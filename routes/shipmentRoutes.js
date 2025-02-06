const express = require("express");
const Shipment = require("../models/Shipment");
const router = express.Router();

// Get all shipments
router.get("/shipments", async (req, res) => {
  const shipments = await Shipment.find();
  res.json(shipments);
});

// Get shipment by ID
router.get("/shipment/:id", async (req, res) => {
  const shipment = await Shipment.findById(req.params.id);
  if (!shipment) return res.status(404).json({ error: "Shipment not found" });
  res.json(shipment);
});

// Update shipment location
router.post("/shipment/:id/update-location", async (req, res) => {
  const { currentLocation } = req.body;
  const shipment = await Shipment.findByIdAndUpdate(
    req.params.id, 
    { currentLocation }, 
    { new: true }
  );
  res.json(shipment);
});

// Get ETA
router.get("/shipment/:id/eta", async (req, res) => {
  const shipment = await Shipment.findById(req.params.id);
  if (!shipment) return res.status(404).json({ error: "Shipment not found" });
  res.json({ eta: shipment.eta });
});

// Create new shipment
router.post("/shipment", async (req, res) => {
  const { containerId, route, currentLocation, eta, status } = req.body;
  const newShipment = new Shipment({ containerId, route, currentLocation, eta, status });
  await newShipment.save();
  res.status(201).json(newShipment);
});

module.exports = router;
