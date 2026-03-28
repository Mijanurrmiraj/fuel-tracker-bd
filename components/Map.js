"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

export default function Map({ pumps = [] }) {
  const [timeData, setTimeData] = useState(pumps);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeData((prev) =>
        prev.map((p) => ({
          ...p,
          minutes: p.minutes > 0 ? p.minutes - 1 : 0,
        }))
      );
    }, 60000); // প্রতি ১ মিনিটে কমবে

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: "80vh" }}>
      <MapContainer center={[23.685, 90.3563]} zoom={7} style={{ height: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {timeData.map((pump, i) => (
          <Marker key={i} position={[pump.lat, pump.lng]}>
            <Popup>
              <div style={{ fontSize: "14px" }}>
                <b>{pump.name}</b> <br />
                ⛽ Fuel: {pump.fuel} <br />
                ⏳ Time left: {pump.minutes} min
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
