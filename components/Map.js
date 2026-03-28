'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Map({ pumps }) {
  return (
    <MapContainer center={[23.6850, 90.3563]} zoom={7} style={{ height: '60vh' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {pumps.map((pump, i) => (
        <Marker key={i} position={[pump.lat, pump.lng]}>
          <Popup>
            <b>{pump.name}</b><br/>
            সময়: {pump.time}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
