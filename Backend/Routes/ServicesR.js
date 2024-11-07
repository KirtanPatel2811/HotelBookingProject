const express = require("express");
const Services = require("../Models/Services");

const router = express.Router();

// Add a new service
router.post("/addService", async (req, res) => {
  const { ServiceName, ServiceDescription, ServicePrice } = req.body;

  // Basic validation
  if (!ServiceName || !ServiceDescription || !ServicePrice) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const service = new Services({
      ServiceName,
      ServiceDescription,
      ServicePrice,
    });

    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all services
router.get("/allServices", async (req, res) => {
  try {
    const services = await Services.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get service by ID
router.get("/:id", async (req, res) => {
  try {
    const service = await Services.findById(req.params.id);
    if (!service)
      return res.status(404).json({ message: "Service not found." });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a service by ID
router.put("/:id", async (req, res) => {
  try {
    const service = await Services.findById(req.params.id);
    if (!service)
      return res.status(404).json({ message: "Service not found." });

    // Update fields
    Object.assign(service, req.body);

    const updatedService = await service.save();
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a service by ID
router.delete("/:id", async (req, res) => {
  try {
    const service = await Services.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    res.json({ message: "Service deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
