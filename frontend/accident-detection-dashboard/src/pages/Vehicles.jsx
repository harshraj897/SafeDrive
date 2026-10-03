import { useEffect, useState } from "react";
import { Car, MapPin, Cpu, Wifi, ShieldCheck } from "lucide-react";
import { fetchVehicles } from "../api/vehicleApi";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVehicles();
  }, []);

  async function loadVehicles() {
    try {
      const data = await fetchVehicles();
      setVehicles(data);
    } catch (error) {
      console.error("Failed to load vehicle:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="vehicles-page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1>My Vehicle</h1>
          <p>Manage your personal SafeDrive vehicle</p>
        </div>
      </div>

      {/* MAIN VEHICLE PANEL */}
      <div className="panel">

        <div className="panel-header">
          <div>
            <h2>My SafeDrive Vehicle</h2>
            <p>
              Your vehicle connected to the SafeDrive system
            </p>
          </div>
        </div>

        {loading ? (

          <div className="loading-message">
            Loading vehicle information...
          </div>

        ) : vehicles.length === 0 ? (

          <div className="loading-message">
            No vehicle found.
          </div>

        ) : (

          <div className="vehicles-grid">

            {vehicles.map((vehicle) => (

              <div
                className="vehicle-card"
                key={vehicle.vehicle_id}
              >

                {/* CARD HEADER */}
                <div className="vehicle-card-header">

                  <div className="vehicle-icon">
                    <Car size={22} />
                  </div>

                  <span
                    className={`vehicle-status ${
                      vehicle.status
                        ? vehicle.status.toLowerCase()
                        : "offline"
                    }`}
                  >
                    {vehicle.status || "Offline"}
                  </span>

                </div>

                {/* VEHICLE NUMBER */}
                <h3>
                  {vehicle.vehicle_number}
                </h3>

                {/* VEHICLE DETAILS */}
                <div className="vehicle-details">

                  <div>
                    <Cpu size={15} />

                    <span>
                      Device: {vehicle.device_id}
                    </span>
                  </div>

                  <div>
                    <MapPin size={15} />

                    <span>
                      {vehicle.location || "Location unavailable"}
                    </span>
                  </div>

                  <div>
                    <Wifi size={15} />

                    <span>
                      SafeDrive Device:{" "}
                      {vehicle.status === "Online"
                        ? "Connected"
                        : "Offline"}
                    </span>
                  </div>

                  <div>
                    <ShieldCheck size={15} />

                    <span>
                      SafeDrive Protection: Active
                    </span>
                  </div>

                </div>

                {/* VEHICLE ID */}
                <div className="vehicle-id">
                  Vehicle ID: {vehicle.vehicle_id}
                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Vehicles;