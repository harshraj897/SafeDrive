const accident = {
  accident_id: "ACC-TEST-001",
  vehicle: "BR-01-AB-4582",
  device: "SD-ESP32-001",
  location: "Patna, Bihar",
  latitude: 25.5941,
  longitude: 85.1376,
  accident_date: "2026-09-05",
  accident_time: "09:00:00",
  severity: "High",
  status: "Alert Sent",
};
async function createAccident() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/accidents",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accident),
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
createAccident();