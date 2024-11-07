const express = require("express");
const Reviews = require("../Models/Reviews");

const router = express.Router();

// Add a new review
router.post("/addReview", async (req, res) => {
  const { RoomID, UserID, Comment, Rating } = req.body;

  // Basic validation
  if (!RoomID || !UserID || !Comment || !Rating) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const review = new Reviews({
      RoomID,
      UserID,
      Comment,
      Rating,
    });

    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all reviews
router.get("/allReviews", async (req, res) => {
  try {
    const reviews = await Reviews.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a review by ID
router.get("/:id", async (req, res) => {
  try {
    const review = await Reviews.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found." });
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a review by ID
router.put("/:id", async (req, res) => {
  try {
    const review = await Reviews.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found." });

    // Update fields
    Object.assign(review, req.body);

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a review by ID
router.delete("/:id", async (req, res) => {
  try {
    const review = await Reviews.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found." });

    res.json({ message: "Review deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
