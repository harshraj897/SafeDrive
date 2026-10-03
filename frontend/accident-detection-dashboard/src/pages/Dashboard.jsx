import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Clock,
  ShieldAlert,
  Car,
  Cpu,
  Wifi,
  X,
  Map,
} from "lucide-react";

import StatCard from "../components/StatCard";
import { fetchAccidents } from "../api/accidentApi";

function Dashboard() {
  const [accidents, setAccidents] = useState([]);
  const [accidentDetected, setAccidentDetected] = useState(false);
  const [selectedAccident, setSelectedAccident] = useState(null);

  // Used to remember the last accident already processed
  const lastAccidentId = useRef(null);

  // Single-user SafeDrive information
  const vehicleNumber = "BR-01-AB-4582";
  const deviceId = "SD-ESP32-001";

  /*
   * Load accidents from backend
   */
async function loadAccidents() {
  try {
    const data = await fetchAccidents();

    setAccidents(data);

    if (data.length === 0) {
      return;
    }

    const latestAccident = data[0];

    // First time dashboard loads:
    // remember the existing latest accident.
    if (lastAccidentId.current === null) {
      lastAccidentId.current = latestAccident.accident_id;
      return;
    }

    // Detect a NEW accident
    if (
      latestAccident.accident_id !== lastAccidentId.current
    ) {
      console.log(
        "🚨 NEW POSSIBLE ACCIDENT DETECTED:",
        latestAccident
      );

      lastAccidentId.current =
        latestAccident.accident_id;

      setSelectedAccident(latestAccident);
      setAccidentDetected(true);
    }

  } catch (error) {
    console.error(
      "Failed to load accidents:",
      error
    );
  }
}

  /*
   * Start automatic monitoring
   */
  useEffect(() => {
    loadAccidents();

    /*
     * Check backend every 5 seconds
     */
    const interval = setInterval(() => {
      loadAccidents();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /*
   * Close the alert
   */
  const acknowledgeAccident = () => {
    setAccidentDetected(false);
    setSelectedAccident(null);
  };

  /*
   * Open accident location in map page
   */
  const viewOnMap = () => {
    window.location.href = "/map";
  };

  const latestAccident = accidents[0];

  return (
    <div className="dashboard-page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1>My SafeDrive</h1>
          <p>
            Personal vehicle safety monitoring
          </p>
        </div>

        {/* No simulate button */}
      </div>

      {/* PERSONAL VEHICLE CARDS */}
      <div className="stats-grid">

        <StatCard
          title="My Vehicle"
          value={vehicleNumber}
          subtitle="Registered vehicle"
          icon={<Car size={22} />}
        />

        <StatCard
          title="SafeDrive Device"
          value={deviceId}
          subtitle="Connected device"
          icon={<Cpu size={22} />}
        />

        <StatCard
          title="System Status"
          value="Active"
          subtitle="SafeDrive is monitoring"
          icon={<Wifi size={22} />}
        />

        <StatCard
          title="Accident History"
          value={accidents.length.toString().padStart(2, "0")}
          subtitle="Possible accidents detected"
          icon={<ShieldAlert size={22} />}
        />

      </div>

      {/* PERSONAL INFORMATION */}
      <div className="dashboard-grid">

        {/* MY VEHICLE */}
        <div className="panel">

          <div className="panel-header">
            <div>
              <h2>My Vehicle</h2>
              <p>Registered SafeDrive vehicle</p>
            </div>
          </div>

          <div className="system-overview">

            <div className="system-row">
              <span>
                <Car size={16} />
                Vehicle Number
              </span>

              <strong>
                {vehicleNumber}
              </strong>

              <span className="system-status online">
                Registered
              </span>
            </div>

            <div className="system-row">
              <span>
                <Cpu size={16} />
                Device ID
              </span>

              <strong>
                {deviceId}
              </strong>

              <span className="system-status online">
                Active
              </span>
            </div>

            <div className="system-row">
              <span>
                <Wifi size={16} />
                Connection
              </span>

              <strong>
                SafeDrive Device
              </strong>

              <span className="system-status online">
                Online
              </span>
            </div>

          </div>

        </div>

        {/* LATEST ALERT */}
        <div className="panel">

          <div className="panel-header">

            <div>
              <h2>Latest Alert</h2>
              <p>
                Most recent possible accident
              </p>
            </div>

          </div>

          {latestAccident ? (

            <div className="accident-item">

              <div className="accident-icon">
                <ShieldAlert size={20} />
              </div>

              <div className="accident-info">

                <strong>
                  Possible Accident
                </strong>

                <span>
                  {latestAccident.vehicle}
                </span>

                <small>
                  <MapPin size={13} />
                  {latestAccident.location}
                </small>

              </div>

              <div className="accident-meta">

                <span className="accident-time">
                  <Clock size={13} />
                  {latestAccident.accident_time}
                </span>

                <span
                  className={`severity ${
                    latestAccident.severity.toLowerCase()
                  }`}
                >
                  {latestAccident.severity}
                </span>

              </div>

            </div>

          ) : (

            <div className="empty-state">

              <ShieldAlert size={28} />

              <p>
                No possible accidents detected.
              </p>

            </div>

          )}

        </div>

      </div>

      {/* RECENT PERSONAL ACCIDENTS */}
      <div className="panel">

        <div className="panel-header">

          <div>
            <h2>My Accident History</h2>

            <p>
              Possible accidents detected by your SafeDrive device
            </p>
          </div>

        </div>

        <div className="accident-list">

          {accidents.length > 0 ? (

            accidents.slice(0, 5).map((accident) => (

              <div
                className="accident-item"
                key={accident.id}
              >

                <div className="accident-icon">
                  <ShieldAlert size={20} />
                </div>

                <div className="accident-info">

                  <strong>
                    Possible Accident
                  </strong>

                  <span>
                    {vehicleNumber}
                  </span>

                  <small>
                    <MapPin size={13} />
                    {accident.location}
                  </small>

                </div>

                <div className="accident-meta">

                  <span className="accident-time">

                    <Clock size={13} />

                    {accident.accident_time}

                  </span>

                  <span
                    className={`severity ${
                      accident.severity.toLowerCase()
                    }`}
                  >
                    {accident.severity}
                  </span>

                </div>

              </div>

            ))

          ) : (

            <div className="empty-state">

              <ShieldAlert size={28} />

              <p>
                No possible accidents detected.
              </p>

            </div>

          )}

        </div>

      </div>

      {/* AUTOMATIC ACCIDENT ALERT */}

      {accidentDetected && selectedAccident && (

        <div className="alert-overlay">

          <div className="accident-alert">

            {/* CLOSE */}
            <button
              className="alert-close"
              onClick={acknowledgeAccident}
              aria-label="Close alert"
            >
              <X size={20} />
            </button>

            {/* ALERT ICON */}
            <div className="alert-icon">
              <ShieldAlert size={32} />
            </div>

            {/* HEADING */}
            <div className="alert-heading">

              <span>
                SAFEDRIVE ALERT
              </span>

              <h2>
                Possible Accident Detected
              </h2>

              <p>
                SafeDrive has detected abnormal
                vehicle movement.
              </p>

            </div>

            {/* DETAILS */}
            <div className="alert-details">

              <div>
                <span>Vehicle</span>

                <strong>
                  {selectedAccident.vehicle}
                </strong>
              </div>

              <div>
                <span>Device</span>

                <strong>
                  {selectedAccident.device}
                </strong>
              </div>

              <div>
                <span>Severity</span>

                <strong className="high-text">
                  {selectedAccident.severity}
                </strong>
              </div>

              <div>
                <span>Time</span>

                <strong>
                  {selectedAccident.accident_time}
                </strong>
              </div>

              <div>
                <span>Location</span>

                <strong>
                  {selectedAccident.location}
                </strong>
              </div>

              <div>
                <span>GPS</span>

                <strong>
                  {selectedAccident.latitude != null &&
                  selectedAccident.longitude != null
                    ? `${selectedAccident.latitude}, ${selectedAccident.longitude}`
                    : "GPS unavailable"}
                </strong>
              </div>

            </div>

            {/* ACTIONS */}
            <div className="alert-actions">

              <button
                className="secondary-btn"
                onClick={viewOnMap}
              >
                <Map size={17} />
                View on Map
              </button>

              <button
                className="simulate-btn"
                onClick={acknowledgeAccident}
              >
                Acknowledge
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Dashboard;