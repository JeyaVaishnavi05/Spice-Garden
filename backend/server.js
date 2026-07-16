const menuRoutes = require("./routes/menuRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const reservationRoutes = require("./routes/reservationRoutes");

const adminRoutes = require("./routes/adminRoutes");


const Menu = require("./models/Menu");
const Reservation = require("./models/Reservation");

const app = express();



app.use(cors({
  origin: "http://127.0.0.1:5500"}));
app.use(express.json());
app.use("/api/menu", menuRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/admin", adminRoutes); 
/* ===== CONNECT MONGODB ===== */
mongoose.connect("mongodb://127.0.0.1:27017/restaurantDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

/* ===== TEST ROUTE ===== */
app.get("/", (req, res) => {
  res.send("Backend + MongoDB running");
});










/* ===== START SERVER ===== */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});