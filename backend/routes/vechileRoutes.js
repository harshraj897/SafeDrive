const express = require("express");
const db = require("../config/db");
const router = express.Router();
// GET all vehicles
router.get("/", async (req, res) => {
  try {
   const [vehicles] = await db.query(
  `SELECT * FROM vehicles
   WHERE vehicle_number = ? AND device_id = ?
   ORDER BY created_at DESC`,
  ["BR-01-AB-4582", "SD-ESP32-001"]
);
    res.json({
      success: true,
      vehicles,
    });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch vehicles",
    });
  }
});
module.exports = router;