'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Map() {
  return (
    <MapContainer center={[23.6850, 90.3563]} zoom={7} style={{ height: "80vh" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={[23.6850, 90.3563]}>
        <Popup>Fuel Available</Popup>
      </Marker>
    </MapContainer>
  );
}
