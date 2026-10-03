const express = require("express");
const db = require("../config/db");
const router = express.Router();
// GET all accidents
router.get("/", async (req, res) => {
  try {
    const [accidents] = await db.query(
  `SELECT * FROM accidents
   WHERE vehicle = ? AND device = ?
   ORDER BY created_at DESC`,
  ["BR-01-AB-4582", "SD-ESP32-001"]
);
    res.json({
      success: true,
      accidents,
    });
  } catch (error) {
    console.error("Error fetching accidents:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch accidents",
    });
  }
});
// POST a new accident
router.post("/", async (req, res) => {
  try {
    const {
      accident_id,
      vehicle,
      device,
      location,
      latitude,
      longitude,
      accident_date,
      accident_time,
      severity,
      status,
    } = req.body;
    // Basic validation
    if (
      !accident_id ||
      !vehicle ||
      !device ||
      !location ||
      !accident_date ||
      !accident_time ||
      !severity
    ) {
      return res.status(400).json({
        success: false,
        message: "Required accident information is missing",
      });
    }
    const [result] = await db.query(
      `INSERT INTO accidents
      (
        accident_id,
        vehicle,
        device,
        location,
        latitude,
        longitude,
        accident_date,
        accident_time,
        severity,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        accident_id,
        vehicle,
        device,
        location,
        latitude || null,
        longitude || null,
        accident_date,
        accident_time,
        severity,
        status || "Alert Sent",
      ]
    );
    console.log("=================================");
console.log("POSSIBLE ACCIDENT EVENT RECEIVED");
console.log("Accident ID:", accident_id);
console.log("Vehicle:", vehicle);
console.log("Device:", device);
console.log("Location:", location);
console.log("Latitude:", latitude);
console.log("Longitude:", longitude);
console.log("Severity:", severity);
console.log("Status:", status || "Alert Sent");
console.log("=================================");
    res.status(201).json({
      success: true,
      message: "Accident created successfully",
      accidentId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating accident:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create accident",
    });
  }
});
module.exports = router;