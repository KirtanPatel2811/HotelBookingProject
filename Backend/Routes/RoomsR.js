const express = require("express");
const router = express.Router();
const Rooms = require("../Models/Rooms");
const multer = require("multer");
const path = require("path");

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory where images will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with unique name
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 },
});
// Route to get all rooms
router.get("/allRooms", async (req, res) => {
  try {
    const rooms = await Rooms.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving rooms", error });
  }
});
// Route to update a room by ID http://localhost:/addRooms/ROOM_ID
router.put("/:id", upload.array("images", 10), async (req, res) => {
  try {
    const roomId = req.params.id;

    const room = await Rooms.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found." });

    room.RoomName = req.body.RoomName || room.RoomName;
    room.RoomType = req.body.RoomType || room.RoomType;
    room.NumberOfBeds = req.body.NumberOfBeds || room.NumberOfBeds;
    room.PricePerNight = req.body.PricePerNight || room.PricePerNight;
    room.Availability = req.body.Availability || room.Availability;
    room.Description = req.body.Description || room.Description;

    if (req.files && req.files.length > 0) {
      room.Images = req.files.map((file) => file.path);
    }

    // Save the updated room
    await room.save();
    res.json({ message: "Room updated successfully", room });
  } catch (error) {
    res.status(500).json({ message: "Error updating room", error });
  }
});
// Route to create a new room with image uploads
router.post("/addRooms", upload.array("images", 10), async (req, res) => {
  try {
    const room = new Rooms({
      RoomName: req.body.RoomName,
      RoomType: req.body.RoomType,
      NumberOfBeds: req.body.NumberOfBeds,
      PricePerNight: req.body.PricePerNight,
      Availability: req.body.Availability,
      Description: req.body.Description,
      Images: req.files.map((file) => file.path),
    });

    await room.save();
    res.status(201).json({ message: "Room added successfully", room });
  } catch (error) {
    res.status(500).json({ message: "Error adding room", error });
  }
});

// Route to get room a room by ID

router.get("/:id", async (req, res) => {
  try {
    const room = await Rooms.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found." });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving room", error });
  }
});

module.exports = router;
