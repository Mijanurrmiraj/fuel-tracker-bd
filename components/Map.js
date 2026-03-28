"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from "react-leaflet";
import { useEffect, useState } from "react";

// 📍 Map click handler
function ClickHandler({ setSelected }) {
  useMapEvents({
    click(e) {
      setSelected(e.latlng);
    },
  });
  return null;
}

export default function Map({ pumps, onAddPump }) {
  const [userLocation, setUserLocation] = useState([23.685, 90.3563]); // default BD
  const [selected, setSelected] = useState(null);

  // 📍 User GPS location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {
          console.log("Location permission denied");
        }
      );
    }
  }, []);

  return (
    <>
      <MapContainer
        center={userLocation}
        zoom={7}
        style={{
          height: "75vh",
          width: "100%",
        }}
      >
        {/* 🗺 Map tiles */}
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 📍 Click select */}
        <ClickHandler setSelected={setSelected} />

        {/* 🔥 Existing pumps */}
        {pumps.map((pump, index) => (
          <Marker key={index} position={[pump.lat, pump.lng]}>
            <Popup>
              <div style={{ fontSize: "14px", lineHeight: "1.5" }}>
                <b>📍 {pump.name || "Pump"}</b> <br />
                ⛽ {pump.fuelType} <br />
                ⏳ {pump.remaining || pump.minutes} min left
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 🟢 Selected location preview */}
        {selected && (
          <Marker position={[selected.lat, selected.lng]}>
            <Popup>📍 New Pump Location</Popup>
          </Marker>
        )}
      </MapContainer>

      {/* 🔥 Bottom Add Button */}
      {selected && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#000",
            color: "#fff",
            padding: "12px 18px",
            borderRadius: "20px",
            zIndex: 999,
            textAlign: "center",
            boxShadow: "0 5px 20px rgba(0,0,0,0.3)"
          }}
        >
          📍 Location Selected
          <br />
          <button
            onClick={() => {
              onAddPump(selected.lat, selected.lng);
              setSelected(null); // reset
            }}
            style={{
              marginTop: 6,
              padding: "8px 14px",
              background: "green",
              border: "none",
              color: "#fff",
              borderRadius: 10,
              fontSize: "14px"
            }}
          >
            ➕ Add Pump Here
          </button>
        </div>
      )}
    </>
  );
}
