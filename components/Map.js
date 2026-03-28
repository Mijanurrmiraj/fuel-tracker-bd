"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from "react-leaflet";
import { useEffect, useState } from "react";

// 📍 Click করলে temporary marker দেখাবে
function ClickHandler({ setSelected }) {
  useMapEvents({
    click(e) {
      setSelected(e.latlng);
    },
  });
  return null;
}

export default function Map({ pumps, onAddPump }) {
  const [userLocation, setUserLocation] = useState([23.685, 90.3563]);
  const [selected, setSelected] = useState(null);

  // 📍 GPS location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  return (
    <>
      <MapContainer
        center={userLocation}
        zoom={7}
        style={{ height: "70vh", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Click Handler */}
        <ClickHandler setSelected={setSelected} />

        {/* 📍 Existing pumps */}
        {pumps.map((pump, i) => (
          <Marker key={i} position={[pump.lat, pump.lng]}>
            <Popup>
              ⛽ {pump.fuelType} <br />
              ⏳ {pump.minutes} min
            </Popup>
          </Marker>
        ))}

        {/* 🟢 Selected marker preview */}
        {selected && (
          <Marker position={[selected.lat, selected.lng]}>
            <Popup>📍 New Pump Location</Popup>
          </Marker>
        )}
      </MapContainer>

      {/* 🔥 ADD BUTTON (after select) */}
      {selected && (
        <div style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#000",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "20px",
          zIndex: 999
        }}>
          📍 Location Selected
          <br />
          <button
            onClick={() => onAddPump(selected.lat, selected.lng)}
            style={{
              marginTop: 5,
              padding: "8px 12px",
              background: "green",
              border: "none",
              color: "#fff",
              borderRadius: 10
            }}
          >
            ➕ Add Pump Here
          </button>
        </div>
      )}
    </>
  );
}
