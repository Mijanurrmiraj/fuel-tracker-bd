"use client";
import { db } from "./firebase";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// 📍 Map click detect
function LocationMarker({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
}

export default function Map({ pumps = [], onMapClick }) {
  return (
    <div style={{ height: "60vh" }}>
      <MapContainer
        center={[23.685, 90.3563]}
        zoom={7}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <LocationMarker onMapClick={onMapClick} />

        {pumps.map((pump, i) => (
          <Marker key={i} position={[pump.lat, pump.lng]}>
            <Popup>
              <b>{pump.name}</b> <br />
              ⛽ {pump.fuel} <br />
              ⏳ {pump.minutes} min
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
