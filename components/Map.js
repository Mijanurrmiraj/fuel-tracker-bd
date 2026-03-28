"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from "react-leaflet";
import { useEffect, useState } from "react";

// 📍 Click করলে location নেওয়া
function AddMarker({ onAdd }) {
  useMapEvents({
    click(e) {
      onAdd(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function Map({ pumps, onAddPump }) {
  const [userLocation, setUserLocation] = useState([23.685, 90.3563]); // default BD

  // 📍 User GPS location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  return (
    <MapContainer
      center={userLocation}
      zoom={7}
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      {/* 🗺 Map Tile */}
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* ➕ Add Pump on Click */}
      <AddMarker onAdd={onAddPump} />

      {/* 📍 Pump Markers */}
      {pumps.map((pump, index) => (
        <Marker key={index} position={[pump.lat, pump.lng]}>
          <Popup>
            <div style={{
              fontSize: "14px",
              lineHeight: "1.5"
            }}>
              <b>⛽ {pump.fuelType}</b> <br />
              ⏳ {pump.remaining || pump.minutes} min left
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
