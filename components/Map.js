'use client';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState } from 'react';

function AddMarker({ onAdd }) {
  useMapEvents({
    click(e) {
      const name = prompt("Pump Name?");
      const time = prompt("কতক্ষণ তেল পাওয়া যাবে?");

      if (name && time) {
        onAdd({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          name,
          time,
        });
      }
    },
  });

  return null;
}

export default function Map() {
  const [pumps, setPumps] = useState([]);

  const handleAdd = (data) => {
    setPumps([...pumps, data]);
  };

  return (
    <>
      <MapContainer center={[23.6850, 90.3563]} zoom={7} style={{ height: "60vh" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <AddMarker onAdd={handleAdd} />

        {pumps.map((p, i) => (
          <Marker key={i} position={[p.lat, p.lng]}>
            <Popup>
              <b>{p.name}</b><br />
              সময়: {p.time}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div style={{ padding: 10 }}>
        <h3>📍 Fuel Available</h3>
        {pumps.map((p, i) => (
          <div key={i}>
            ⛽ {p.name} - {p.time}
          </div>
        ))}
      </div>
    </>
  );
}
