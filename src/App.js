import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import "leaflet/dist/leaflet.css";
import "./App.css";

// Mock Data
const mockWildfireData = [
  {
    latitude: 34.0522,
    longitude: -118.2437,
    intensity: 75,
    location: "Los Angeles",
  },
  {
    latitude: 36.7783,
    longitude: -119.4179,
    intensity: 50,
    location: "Fresno",
  },
  {
    latitude: 37.7749,
    longitude: -122.4194,
    intensity: 90,
    location: "San Francisco",
  },
];

const mockResourceData = [
  { latitude: 34.05, longitude: -118.25, type: "Fire Truck", name: "Truck A" },
  {
    latitude: 36.77,
    longitude: -119.41,
    type: "Medical Supply",
    name: "Supply B",
  },
];

const mockHeatmapData = [
  [34.0522, -118.2437, 0.8], // [latitude, longitude, intensity]
  [36.7783, -119.4179, 0.6],
  [37.7749, -122.4194, 1],
];

const evacuationTemplates = [
  "Evacuate immediately via Route A to Shelter X.",
  "Stay indoors and close all windows to avoid smoke inhalation.",
];

function App() {
  const sendSMSAlert = () => {
    alert("SMS alert sent via Twilio!");
    // Replace this with actual Twilio integration in the backend
  };

  const sendPushNotification = () => {
    alert("Push notification sent via Firebase Cloud Messaging!");
    // Replace this with actual FCM integration in the backend
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Real-Time Wildfire Dashboard</h1>
      </header>

      <div className="content">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Actions</h2>
          <button onClick={sendSMSAlert} className="action-button">
            Send SMS Alert
          </button>
          <button onClick={sendPushNotification} className="action-button">
            Send Push Notification
          </button>

          <h2>Evacuation Templates</h2>
          <ul>
            {evacuationTemplates.map((template, index) => (
              <li key={index}>{template}</li>
            ))}
          </ul>
        </aside>

        {/* Map Section */}
        <main className="main">
          <MapContainer
            center={[34.0522, -118.2437]}
            zoom={6}
            className="map-container"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Wildfire Markers */}
            {mockWildfireData.map((fire, index) => (
              <Marker key={index} position={[fire.latitude, fire.longitude]}>
                <Popup>
                  <strong>Fire Detected</strong>
                  <br />
                  Intensity: {fire.intensity}
                  <br />
                  Location: {fire.location}
                </Popup>
              </Marker>
            ))}

            {/* Resource Markers */}
            {mockResourceData.map((resource, index) => (
              <Marker
                key={index}
                position={[resource.latitude, resource.longitude]}
              >
                <Popup>
                  <strong>{resource.type}</strong>
                  <br />
                  Name: {resource.name}
                </Popup>
              </Marker>
            ))}

            {/* Heatmap Layer */}
            <HeatmapLayer
              points={mockHeatmapData}
              longitudeExtractor={(point) => point[1]}
              latitudeExtractor={(point) => point[0]}
              intensityExtractor={(point) => point[2]}
              radius={25}
              blur={15}
              max={1}
            />
          </MapContainer>
        </main>
      </div>

      <footer className="footer">
        <p>Real-Time Wildfire Dashboard © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
