"use client";

import { useEffect, useState } from "react";

export default function Map({ pumps = [] }) {
  const [Leaflet, setLeaflet] = useState(null);

  useEffect(() => {
    import("leaflet").then((L) => {
      setLeaflet(L);
    });
  }, []);

  if (!Leaflet) return <p>Loading map...</p>;

  const { MapContainer, TileLayer, Marker, Popup } =
    require("react-leaflet");

  return (
    <div style={{ height: "80vh" }}>
      <MapContainer center={[23.685, 90.3563]} zoom={7} style={{ height: "100%" }}>
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
