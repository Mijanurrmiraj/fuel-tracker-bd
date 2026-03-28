"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({ pumps }) {
  return (
    <MapContainer center={[23.685, 90.3563]} zoom={7} style={{ height: "80vh" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {pumps.map((pump, i) => (
        <Marker key={i} position={[pump.lat, pump.lng]}>
          <Popup>
            <b>{pump.name}</b> <br />
            Fuel: {pump.fuel} <br />
            Time left: {pump.minutes} min
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
