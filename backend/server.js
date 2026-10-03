const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");
const accidentRoutes=require("./routes/accidentRoutes");
const vechileRoutes = require("./routes/vechileRoutes");
const contactRoutes = require("./routes/contactRoutes");
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
//Accident Api
app.use("/api/accidents",accidentRoutes);
// vechile
app.use("/api/vechiles",vechileRoutes);
//contact 
app.use("/api/contacts",contactRoutes);
//esp32
app.get("/api/device-test",(req,res)=>{
  console.log("ESP32 connected successfully");
  res.json({
    success:true,
    message:"ESP32 connected to safedrive backend"
  });
});
// Test backend
app.get("/", (req, res) => {
  res.json({
    message: "SafeDrive backend is running",
  });
});
// Test MySQL connection
app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS result");
    res.json({
      success: true,
      message: "MySQL connected successfully",
      result: rows,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "MySQL connection failed",
    });
  }
});
// Start server
app.listen(PORT, () => {
  console.log(`SafeDrive server running on port ${PORT}`);
});