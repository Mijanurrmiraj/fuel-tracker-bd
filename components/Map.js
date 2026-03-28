"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from "react-leaflet";

import { useState } from "react";
import "leaflet/dist/leaflet.css";

function ClickHandler({ setLocation }) {
  useMapEvents({
    click(e) {
      setLocation(e.latlng);
    }
  });
  return null;
}

export default function Map({ pumps, addPump }) {
  const [location, setLocation] = useState(null);

  return (
    <>
      <MapContainer
        center={[23.685, 90.3563]}
        zoom={7}
        style={{ height: "100vh" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <ClickHandler setLocation={setLocation} />

        {pumps.map((p, i) => (
          <Marker key={i} position={[p.lat, p.lng]}>
            <Popup>
              <b>{p.name}</b> <br />
              ⛽ {p.fuelType} <br />
              ⏳ {p.minutes} min
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating Button */}
      <button
        onClick={() => {
          if (!location) return alert("Map এ ক্লিক করো");
          addPump(location);
        }}
        style={{
          position: "fixed",
          bottom: 100,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#ff9800",
          color: "#fff",
          fontSize: 28,
          border: "none",
          zIndex: 999
        }}
      >
        +
      </button>
    </>
  );
}
