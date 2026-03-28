"use client";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";

function AddMarker({ onAdd }) {
  useMapEvents({
    click(e) {
      onAdd(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function Map({ pumps, onAddPump }) {
  return (
    <MapContainer
      center={[23.685, 90.3563]}
      zoom={7}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <AddMarker onAdd={onAddPump} />

      {pumps.map((pump, i) => (
        <Marker key={i} position={[pump.lat, pump.lng]}>
          <Popup>
            ⛽ {pump.fuelType} <br />
            ⏳ {pump.minutes} minutes
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
