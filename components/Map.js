"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { db } from "../lib/firebase";
import { ref, push, onValue } from "firebase/database";

// 🔥 Leaflet icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// 📍 Map click handler
function ClickHandler({ setLocation }) {
  useMapEvents({
    click(e) {
      setLocation(e.latlng);
    },
  });
  return null;
}

export default function Map() {
  const [location, setLocation] = useState(null);
  const [pumps, setPumps] = useState([]);
  const [livePumps, setLivePumps] = useState([]);

  // 🔥 Form state
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [fuel, setFuel] = useState("");
  const [minutes, setMinutes] = useState("");

  // 🔥 Load realtime data
  useEffect(() => {
  const pumpRef = ref(db, "pumps");

  onValue(pumpRef, (snapshot) => {
    const data = snapshot.val();

    if (data) {
      const list = Object.values(data);

      const updated = list
        .map((p) => {
          const passed = Math.floor(
            (Date.now() - p.createdAt) / 60000
          );

          const remaining = p.minutes - passed;

          return {
            ...p,
            remaining,
          };
        })
        .filter((p) => p.remaining > 0);

      setLivePumps(updated);
    }
  });
}, []);

  // ➕ Add pump
  const savePump = () => {
    if (!name || !fuel || !minutes || !location) {
      return alert("সব তথ্য পূরণ করো");
    }

    push(ref(db, "pumps"), {
      name,
      fuel,
      minutes,
      lat: location.lat,
      lng: location.lng,
      createdAt: Date.now(),
    });

    setShowForm(false);
    setName("");
    setFuel("");
    setMinutes("");
    setLocation(null);
  };

  return (
    <>
      <MapContainer
        center={[23.685, 90.3563]}
        zoom={7}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Click */}
        <ClickHandler setLocation={setLocation} />

        {/* Existing pumps */}
        {livePumps.map((p, i) => (
          <Marker key={i} position={[p.lat, p.lng]}>
            <Popup>
              <b>{p.name}</b> <br />
              ⛽ {p.fuel} <br />
              ⏳ {p.remaining} min left
            </Popup>
          </Marker>
        ))}

        {/* Selected location */}
        {location && <Marker position={location}></Marker>}
      </MapContainer>

      {/* ➕ Floating Button */}
      <button
        onClick={() => {
          if (!location) return alert("আগে map এ click করো");
          setShowForm(true);
        }}
        style={{
          position: "fixed",
          bottom: 80,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#ff5722",
          color: "#fff",
          fontSize: 28,
          border: "none",
          zIndex: 999,
        }}
      >
        +
      </button>

      {/* 🔥 Bottom Form */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            background: "#fff",
            padding: 20,
            borderRadius: "20px 20px 0 0",
            boxShadow: "0 -5px 20px rgba(0,0,0,0.3)",
            zIndex: 1000,
          }}
        >
          <h3>Add Fuel Pump</h3>

          <input
            placeholder="Pump Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />

          <select
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          >
            <option value="">Fuel Type</option>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Octane</option>
          </select>

          <input
            type="number"
            placeholder="Minutes থাকবে"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />

          <button
            onClick={savePump}
            style={{
              width: "100%",
              padding: 12,
              background: "green",
              color: "#fff",
              border: "none",
              borderRadius: 10,
            }}
          >
            ✅ Save Pump
          </button>
        </div>
      )}
    </>
  );
}
