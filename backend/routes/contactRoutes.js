const express = require("express");
const db = require("../config/db");
const router = express.Router();
// GET all emergency contacts
router.get("/", async (req, res) => {
  try {
    const [contacts] = await db.query(
      "SELECT * FROM emergency_contacts ORDER BY created_at DESC"
    );
    res.json({
      success: true,
      contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch emergency contacts",
    });
  }
});
// POST a new emergency contact
router.post("/", async (req, res) => {
  try {
    const {
      name,
      phone,
      relationship,
      priority,
      status,
    } = req.body;
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone number are required",
      });
    }
    const [result] = await db.query(
      `INSERT INTO emergency_contacts
      (
        name,
        phone,
        relationship,
        priority,
        status
      )
      VALUES (?, ?, ?, ?, ?)`,
      [
        name,
        phone,
        relationship || null,
        priority || "Secondary",
        status || "Active",
      ]
    );
    res.status(201).json({
      success: true,
      message: "Emergency contact created successfully",
      contactId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create emergency contact",
    });
  }
});
module.exports = router;