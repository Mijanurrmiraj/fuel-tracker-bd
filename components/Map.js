"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from "react-leaflet";

import MarkerClusterGroup from "react-leaflet-cluster";
import { useState } from "react";

// 📍 click handler
function ClickHandler({ setSelected }) {
  useMapEvents({
    click(e) {
      setSelected(e.latlng);
    },
  });
  return null;
}

export default function Map({ pumps, onAddPump }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <MapContainer
        center={[23.685, 90.3563]}
        zoom={7}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler setSelected={setSelected} />

        {/* 🔥 CLUSTER */}
        <MarkerClusterGroup chunkedLoading>
          {pumps.map((pump, i) => (
            <Marker key={i} position={[pump.lat, pump.lng]}>
              <Popup>
                <b>{pump.name}</b> <br />
                ⛽ {pump.fuelType} <br />
                ⏳ {pump.minutes} min
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

        {selected && (
          <Marker position={[selected.lat, selected.lng]}>
            <Popup>New Pump</Popup>
          </Marker>
        )}
      </MapContainer>

      {/* ➕ Floating Button */}
      <button
        onClick={() => {
          if (selected) {
            onAddPump(selected.lat, selected.lng);
            setSelected(null);
          } else {
            alert("Map এ ক্লিক করে location select করো");
          }
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
          fontSize: 30,
          border: "none",
          boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
          zIndex: 999,
        }}
      >
        +
      </button>
    </>
  );
}
