const express = require("express");
const multer = require("multer");
const path = require("path");
const Staffs = require("../Models/Staffs");

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/staffImages"); // Folder to store images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
});

// Add a new staff with image upload
router.post("/addStaff", upload.single("Image"), async (req, res) => {
  const {
    FirstName,
    LastName,
    Email,
    PhoneNumber,
    Position,
    JoiningDate,
    Salary,
    DOB,
  } = req.body;

  // Validate required fields
  if (
    !FirstName ||
    !LastName ||
    !Email ||
    !PhoneNumber ||
    !Position ||
    !JoiningDate ||
    !Salary ||
    !DOB ||
    !req.file
  ) {
    return res
      .status(400)
      .json({ message: "All fields including an image are required." });
  }

  try {
    const staff = new Staffs({
      FirstName,
      LastName,
      Email,
      PhoneNumber,
      Position,
      JoiningDate,
      Salary,
      DOB,
      Image: req.file.path, // Storing the image path
    });

    const newStaff = await staff.save();
    res.status(201).json(newStaff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all staff
router.get("/allStaff", async (req, res) => {
  try {
    const staffs = await Staffs.find();
    res.json(staffs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a staff by ID
router.get("/:id", async (req, res) => {
  try {
    const staff = await Staffs.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found." });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a staff by ID
router.put("/:id", upload.single("Image"), async (req, res) => {
  try {
    const staff = await Staffs.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found." });

    // Update fields
    Object.assign(staff, req.body);
    if (req.file) {
      staff.Image = req.file.path; // If a new image is uploaded, update the image path
    }

    const updatedStaff = await staff.save();
    res.json(updatedStaff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a staff by ID
router.delete("/:id", async (req, res) => {
  try {
    const staff = await Staffs.findByIdAndDelete(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found." });

    res.json({ message: "Staff deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
