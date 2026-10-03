import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import { fetchVehicles } from "../api/vehicleApi";
import { fetchAccidents } from "../api/accidentApi";

function MapPage() {
  const [vehicles, setVehicles] = useState([]);
  const [accidents, setAccidents] = useState([]);

  useEffect(() => {
    loadMapData();

    const interval = setInterval(() => {
      loadMapData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  async function loadMapData() {
    try {
      const vehicleData = await fetchVehicles();
      const accidentData = await fetchAccidents();

      setVehicles(vehicleData);
      setAccidents(accidentData);
    } catch (error) {
      console.error("Failed to load map data:", error);
    }
  }

  const vehicleWithLocation = vehicles.find(
    (vehicle) =>
      vehicle.latitude != null &&
      vehicle.longitude != null
  );

  return (
    <div className="map-page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1>My Vehicle Location</h1>

          <p>
            Live location of your SafeDrive vehicle
          </p>
        </div>
      </div>

      {/* VEHICLE LOCATION INFORMATION */}
      <div className="panel">

        <div className="panel-header">
          <div>
            <h2>Live Vehicle Location</h2>

            <p>
              SafeDrive updates the vehicle location automatically
            </p>
          </div>
        </div>

        <div className="map-status">

          {vehicleWithLocation ? (

            <p>
              📍 Vehicle location available
            </p>

          ) : (

            <p>
              📍 Vehicle location is currently unavailable
            </p>

          )}

        </div>

      </div>

      {/* MAP */}
      <div className="map-container">

        <MapContainer
          center={[25.5941, 85.1376]}
          zoom={7}
          style={{
            height: "600px",
            width: "100%",
          }}
        >

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* MY VEHICLE MARKER */}

          {vehicles.map((vehicle) => {

            if (
              vehicle.latitude == null ||
              vehicle.longitude == null
            ) {
              return null;
            }

            return (
              <Marker
                key={`vehicle-${vehicle.vehicle_id}`}
                position={[
                  Number(vehicle.latitude),
                  Number(vehicle.longitude),
                ]}
              >

                <Popup>

                  <strong>
                    🚗 My SafeDrive Vehicle
                  </strong>

                  <br />

                  Vehicle:
                  {" "}
                  {vehicle.vehicle_number}

                  <br />

                  Device:
                  {" "}
                  {vehicle.device_id}

                  <br />

                  Location:
                  {" "}
                  {vehicle.location || "Unavailable"}

                  <br />

                  Status:
                  {" "}
                  {vehicle.status}

                </Popup>

              </Marker>
            );
          })}

          {/* POSSIBLE ACCIDENT LOCATIONS */}

          {accidents.map((accident) => {

            if (
              accident.latitude == null ||
              accident.longitude == null
            ) {
              return null;
            }

            return (
              <Marker
                key={`accident-${accident.id}`}
                position={[
                  Number(accident.latitude),
                  Number(accident.longitude),
                ]}
              >

                <Popup>

                  <strong>
                    🚨 Possible Accident
                  </strong>

                  <br />

                  Accident ID:
                  {" "}
                  {accident.accident_id}

                  <br />

                  Vehicle:
                  {" "}
                  {accident.vehicle}

                  <br />

                  Device:
                  {" "}
                  {accident.device}

                  <br />

                  Severity:
                  {" "}
                  {accident.severity}

                  <br />

                  Location:
                  {" "}
                  {accident.location}

                  <br />

                  Date:
                  {" "}
                  {accident.accident_date}

                  <br />

                  Time:
                  {" "}
                  {accident.accident_time}

                  <br />

                  Status:
                  {" "}
                  {accident.status}

                </Popup>

              </Marker>
            );
          })}

        </MapContainer>

      </div>

    </div>
  );
}

export default MapPage;