const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");

/* =========================
   GET ALL RESERVATIONS
========================= */
router.get("/", async (req, res) => {

  try {

    const reservations = await Reservation.find();

    res.json(reservations);

  } catch (error) {

    console.error("Error fetching reservations:", error);

    res.status(500).json({ error: "Failed to fetch reservations" });

  }

});


/* =========================
   CREATE RESERVATION
========================= */
router.post("/", async (req, res) => {

  try {

    const reservation = new Reservation(req.body);

    await reservation.save();

    res.json({
      success: true,
      message: "Reservation saved successfully",
      reservation
    });

  } catch (error) {

    console.error("Error saving reservation:", error);

    res.status(500).json({ error: "Failed to save reservation" });

  }

});


/* =========================
   CONFIRM RESERVATION
========================= */
router.put("/:id", async (req, res) => {

  try {

    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status: "Confirmed" },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.json({
      success: true,
      message: "Reservation confirmed",
      reservation: updatedReservation
    });

  } catch (error) {

    console.error("Error confirming reservation:", error);

    res.status(500).json({ error: "Failed to confirm reservation" });

  }

});


/* =========================
   DELETE RESERVATION
========================= */
router.delete("/:id", async (req, res) => {

  try {

    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.json({
      success: true,
      message: "Reservation deleted"
    });

  } catch (error) {

    console.error("Error deleting reservation:", error);

    res.status(500).json({ error: "Failed to delete reservation" });

  }

});


module.exports = router;