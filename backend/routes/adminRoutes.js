const express = require("express");
const router = express.Router();

/* SIMPLE ADMIN LOGIN (Demo Purpose) */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Hardcoded admin credentials (acceptable for internship demo)
  if (email === "admin@restaurant.com" && password === "admin123") {
    res.json({
      success: true,
      token: "admin-auth-token"
    });
  } else {
    res.json({ success: false });
  }
});

module.exports = router;