const express = require("express");
const Users = require("../Models/Users");

const router = express.Router();

// Get all users
router.get("/allUsers", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//addUser
router.post("/addUser", async (req, res) => {
  const {
    Username,
    Email,
    Password,
    DateOfBirth,
    PhoneNumber,
    Address,
    Gender,
    Role,
  } = req.body;

  // Basic validation
  if (
    !Username ||
    !Email ||
    !Password ||
    !DateOfBirth ||
    !PhoneNumber ||
    !Address ||
    !Gender ||
    !Role
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check for unique fields
  try {
    const existingUser = await Users.findOne({
      $or: [{ Username }, { Email }, { PhoneNumber }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username, Email, or PhoneNumber already exists." });
    }

    const user = new Users({
      Username,
      Email,
      Password,
      DateOfBirth,
      PhoneNumber,
      Address,
      Gender,
      Role,
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
