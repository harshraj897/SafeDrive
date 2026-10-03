
const STORAGE_KEY = "safedrive_accidents";
const initialAccidents = [
  {
    id: "ACC-1024",
    vehicle: "BR-01-AB-4582",
    device: "SD-ESP32-001",
    location: "Patna, Bihar",
    latitude: 25.5941,
    longitude: 85.1376,
    date: "04 Sep 2026",
    time: "09:42 AM",
    severity: "High",
    status: "Alert Sent",
  },
  {
    id: "ACC-1023",
    vehicle: "JH-18-CD-2291",
    device: "SD-ESP32-002",
    location: "Sahibganj, Jharkhand",
    latitude: 25.2442,
    longitude: 87.6454,
    date: "03 Sep 2026",
    time: "04:18 PM",
    severity: "Medium",
    status: "Reviewed",
  },
  {
    id: "ACC-1022",
    vehicle: "BR-06-XZ-7812",
    device: "SD-ESP32-003",
    location: "Gaya, Bihar",
    latitude: 24.7914,
    longitude: 85.0002,
    date: "02 Sep 2026",
    time: "11:27 AM",
    severity: "Low",
    status: "False Alarm",
  },
];
export function getAccidents() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialAccidents));
    return initialAccidents;
  }
  try {
    return JSON.parse(stored);
  } catch (error) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialAccidents));
    return initialAccidents;
  }
}
export function addAccident(accident) {
  const accidents = getAccidents();
  const updatedAccidents = [accident, ...accidents];
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedAccidents)
  );
  return updatedAccidents;
}
export function createSimulatedAccident() {
  const now = new Date();
  return {
    id: `ACC-${Date.now().toString().slice(-6)}`,
    vehicle: "BR-01-AB-4582",
    device: "SD-ESP32-001",
    location: "Patna, Bihar",
    latitude: 25.5941,
    longitude: 85.1376,
    date: now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    time: now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    severity: "High",
    status: "Alert Sent",
  };
}