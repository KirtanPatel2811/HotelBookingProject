const port = 3003;
const url = `mongodb+srv://FSD:FSD@cluster0.4js4o.mongodb.net/Hotel_Management`;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const UserRoutes = require("./Routes/UsersR");
const RoomRoutes = require("./Routes/RoomsR");
const BookingRoutes = require("./Routes/BookingsR");
const PaymentRoutes = require("./Routes/PaymentR");
const ServiseRoutes = require("./Routes/ServicesR");
const ServiceBookings = require("./Routes/ServiceBookingsR");
const StaffRoutes = require("./Routes/StaffsR");
const InventoryRoutes = require("./Routes/InventoryR");
const ReviewRoutes = require("./Routes/ReviewsR");

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.error(error));

db.once("open", () => console.log("Connected to MongoDB"));

// API Routes
app.get("/", (req, res) => {
  res.send("Hello, this is Hotel Management System");
});

// API routes
app.use("/api/users", UserRoutes);
app.use("/api/rooms", RoomRoutes);
app.use("/api/bookings", BookingRoutes);
app.use("/api/payments", PaymentRoutes);
app.use("/api/services", ServiseRoutes);
app.use("/api/serviceBookings", ServiceBookings);
app.use("/api/staffs", StaffRoutes);
app.use("/api/inventorys", InventoryRoutes);
app.use("/api/reviews", ReviewRoutes);

// Start server
app.listen(port, (error) => {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});
