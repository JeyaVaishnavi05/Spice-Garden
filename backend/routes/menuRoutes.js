const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Menu = require("../models/Menu");


/* =========================
   GET ALL MENU ITEMS
========================= */
router.get("/", async (req, res) => {

  try {

    const menu = await Menu.find();

    res.json(menu);

  } catch (error) {

    console.error("Error fetching menu:", error);

    res.status(500).json({ error: "Failed to fetch menu items" });

  }

});


/* =========================
   ADD MENU ITEM
========================= */
router.post("/", async (req, res) => {

  try {

    const menuItem = new Menu(req.body);

    await menuItem.save();

    res.json({
      success: true,
      message: "Menu item added successfully",
      menuItem
    });

  } catch (error) {

    console.error("Error adding menu item:", error);

    res.status(500).json({ error: "Failed to add menu item" });

  }

});


/* =========================
   DELETE MENU ITEM
========================= */
router.delete("/:id", async (req, res) => {

  try {

    const id = req.params.id;

    /* Validate MongoDB ObjectId */
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid menu ID" });
    }

    const deletedItem = await Menu.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json({
      success: true,
      message: "Menu item deleted successfully"
    });

  } catch (error) {

    console.error("Delete error:", error);

    res.status(500).json({ error: "Server error while deleting menu item" });

  }

});


module.exports = router;