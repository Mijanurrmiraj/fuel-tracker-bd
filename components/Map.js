"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  return (
    <MapContainer
      center={[23.685, 90.3563]}
      zoom={7}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      <Marker position={[23.685, 90.3563]}>
        <Popup>Test Fuel Pump</Popup>
      </Marker>
    </MapContainer>
  );
}
