import { useEffect, useState } from "react";
import {
  ShieldAlert,
  MapPin,
  Clock,
  Car,
  Cpu,
} from "lucide-react";

import { fetchAccidents } from "../api/accidentApi";

function Accidents() {
  const [accidents, setAccidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccidents();
  }, []);

  async function loadAccidents() {
    try {
      const data = await fetchAccidents();
      setAccidents(data);
    } catch (error) {
      console.error("Failed to load accidents:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="accidents-page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1>My Accident History</h1>
          <p>
            View possible accidents detected by your SafeDrive device
          </p>
        </div>
      </div>

      {/* ACCIDENT HISTORY PANEL */}
      <div className="panel">

        <div className="panel-header">
          <div>
            <h2>My Accident History</h2>

            <p>
              {accidents.length} possible accident
              {accidents.length !== 1 ? "s" : ""} detected
            </p>
          </div>
        </div>

        {loading ? (

          <div className="loading-message">
            Loading accident history...
          </div>

        ) : accidents.length === 0 ? (

          <div className="empty-state">
            <ShieldAlert size={30} />

            <p>
              No possible accidents detected.
            </p>

            <span>
              Your SafeDrive device has not reported any
              possible accident events yet.
            </span>
          </div>

        ) : (

          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Vehicle</th>
                  <th>Device</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Severity</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {accidents.map((accident) => (

                  <tr key={accident.id}>

                    {/* ID */}
                    <td>
                      <strong>
                        {accident.accident_id}
                      </strong>
                    </td>

                    {/* VEHICLE */}
                    <td>
                      <div className="location-cell">
                        <Car size={15} />
                        {accident.vehicle}
                      </div>
                    </td>

                    {/* DEVICE */}
                    <td>
                      <div className="location-cell">
                        <Cpu size={15} />
                        {accident.device}
                      </div>
                    </td>

                    {/* LOCATION */}
                    <td>
                      <div className="location-cell">
                        <MapPin size={15} />
                        {accident.location}
                      </div>
                    </td>

                    {/* DATE */}
                    <td>
                      {accident.accident_date}
                    </td>

                    {/* TIME */}
                    <td>
                      <div className="location-cell">
                        <Clock size={15} />
                        {accident.accident_time}
                      </div>
                    </td>

                    {/* SEVERITY */}
                    <td>
                      <span
                        className={`severity ${
                          accident.severity
                            ? accident.severity.toLowerCase()
                            : ""
                        }`}
                      >
                        {accident.severity}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td>
                      <span className="status-badge">
                        {accident.status}
                      </span>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Accidents;