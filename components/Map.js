"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({ pumps = [] }) {
  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <MapContainer
        center={[23.685, 90.3563]}
        zoom={7}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {pumps.map((pump, i) => (
          <Marker key={i} position={[pump.lat, pump.lng]}>
            <Popup>
              <b>{pump.name}</b> <br />
              Fuel: {pump.fuel} <br />
              Time: {pump.minutes} min
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
