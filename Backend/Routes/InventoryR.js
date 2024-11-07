const express = require("express");
const Inventorys = require("../Models/Inventorys");

const router = express.Router();

// Add a new inventory item
router.post("/addItem", async (req, res) => {
  const { ItemName, Quantity, Price, Description } = req.body;

  // Basic validation
  if (!ItemName || !Quantity || !Price || !Description) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const inventoryItem = new Inventorys({
      ItemName,
      Quantity,
      Price,
      Description,
    });

    const newItem = await inventoryItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all inventory items
router.get("/allItems", async (req, res) => {
  try {
    const items = await Inventorys.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get an item by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Inventorys.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found." });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an item by ID
router.put("/:id", async (req, res) => {
  try {
    const item = await Inventorys.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found." });

    // Update fields
    Object.assign(item, req.body);

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item by ID
router.delete("/:id", async (req, res) => {
  try {
    const item = await Inventorys.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found." });

    res.json({ message: "Item deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
