"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { db } from "../lib/firebase";
import { ref, push, onValue } from "firebase/database";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const [pumps, setPumps] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [fuelType, setFuelType] = useState("");
  const [minutes, setMinutes] = useState("");
  const [name, setName] = useState("");

  // 🔥 Realtime sync
  useEffect(() => {
    const pumpsRef = ref(db, "pumps");

    onValue(pumpsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPumps(Object.values(data));
      }
    });
  }, []);

  // ➕ Add pump
  const addPump = (lat, lng) => {
    if (!fuelType || !minutes || !name) {
      return alert("সব তথ্য দিন");
    }

    push(ref(db, "pumps"), {
      lat,
      lng,
      name,
      fuelType,
      minutes: parseInt(minutes),
      createdAt: Date.now(),
    });

    setShowForm(false);
    setFuelType("");
    setMinutes("");
    setName("");
  };

  return (
    <div>
      {/* HEADER */}
      <div style={{
        background: "#000",
        color: "#fff",
        padding: 12,
        textAlign: "center",
        fontWeight: "bold"
      }}>
        ⛽ Fuel Map BD
      </div>

      {/* MAP */}
      <Map pumps={pumps} onAddPump={(lat, lng) => {
        setShowForm(true);
        window.selectedLocation = { lat, lng };
      }} />

      {/* ➕ FLOAT BUTTON */}
      <button
        onClick={() => setShowForm(true)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "#ff3d00",
          color: "#fff",
          border: "none",
          padding: 15,
          borderRadius: "50%",
          fontSize: 20,
          zIndex: 1000
        }}
      >
        +
      </button>

      {/* 🔥 FULL SCREEN FORM (MOBILE FIX) */}
      {showForm && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "#fff",
          zIndex: 2000,
          overflowY: "auto",
          padding: 20
        }}>
          <h2>Add Fuel Pump</h2>

          {/* Pump Name */}
          <input
            type="text"
            placeholder="Pump Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 10
            }}
          />

          {/* Fuel */}
          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 10
            }}
          >
            <option value="">Select Fuel</option>
            <option>Petrol</option>
            <option>Octane</option>
            <option>Diesel</option>
          </select>

          {/* Minutes */}
          <input
            type="number"
            placeholder="কত মিনিট তেল থাকবে"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 10
            }}
          />

          {/* Save */}
          <button
            onClick={() =>
              addPump(
                window.selectedLocation?.lat || 23.7,
                window.selectedLocation?.lng || 90.4
              )
            }
            style={{
              width: "100%",
              padding: 15,
              background: "green",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontSize: 16
            }}
          >
            ✅ Save Pump
          </button>

          {/* Cancel */}
          <button
            onClick={() => setShowForm(false)}
            style={{
              width: "100%",
              padding: 12,
              marginTop: 10,
              background: "#ccc",
              border: "none",
              borderRadius: 10
            }}
          >
            ❌ Cancel
          </button>
        </div>
      )}
    </div>
  );
}
<div style={{
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "35%",
  background: "#0f7d3b",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  padding: "10px",
  overflowY: "scroll",
  color: "#fff",
  zIndex: 999
}}>
  <h3>🔥 Active Pumps</h3>

  {pumps.map((p, i) => (
    <div key={i} style={{
      background: "#fff",
      color: "#000",
      padding: 10,
      borderRadius: 10,
      marginBottom: 10
    }}>
      <b>{p.name}</b><br/>
      ⛽ {p.fuelType} <br/>
      ⏳ {p.minutes} min
    </div>
  ))}
</div>
{/* 🔥 Developer Footer */}
<div
  style={{
    position: "fixed",
    bottom: 10,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#ffffff",
    padding: "10px 20px",
    borderRadius: "20px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
    zIndex: 1000,
    textAlign: "center",
    fontSize: "14px",
  }}
>
  <div style={{ marginBottom: "5px", fontWeight: "bold" }}>
    🚀 Developed by
  </div>

  <a
    href="https://www.facebook.com/mijanurrmiraj"
    target="_blank"
    style={{
      color: "#0f7d3b",
      fontWeight: "bold",
      textDecoration: "none",
    }}
  >
    Mijanur R. Miraj
  </a>
</div>
