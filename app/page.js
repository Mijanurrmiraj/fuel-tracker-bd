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

  const addPump = (lat, lng) => {
    if (!fuelType || !minutes) return alert("সব পূরণ করো");

    const pumpsRef = ref(db, "pumps");

    push(pumpsRef, {
      lat,
      lng,
      fuelType,
      minutes: parseInt(minutes),
      createdAt: Date.now(),
    });

    setShowForm(false);
    setFuelType("");
    setMinutes("");
  };

  return (
    <div>
      {/* 🔥 HEADER */}
      <div style={{
        background: "#000",
        color: "#fff",
        padding: "12px",
        fontSize: "20px",
        fontWeight: "bold",
        textAlign: "center"
      }}>
        ⛽ Fuel Map BD
      </div>

      {/* 🗺 MAP */}
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
          padding: "15px",
          borderRadius: "50%",
          fontSize: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
        }}
      >
        +
      </button>

      {/* 📱 BOTTOM SHEET FORM */}
      {showForm && (
        <div style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          background: "#fff",
          padding: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          boxShadow: "0 -5px 20px rgba(0,0,0,0.2)"
        }}>
          <h3>Add Fuel Pump</h3>

          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          >
            <option value="">Select Fuel</option>
            <option>Petrol</option>
            <option>Octane</option>
            <option>Diesel</option>
          </select>

          <input
            type="number"
            placeholder="Minutes থাকবে"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />

          <button
            onClick={() =>
              addPump(
                window.selectedLocation?.lat || 23.7,
                window.selectedLocation?.lng || 90.4
              )
            }
            style={{
              width: "100%",
              padding: 12,
              background: "green",
              color: "#fff",
              border: "none",
              borderRadius: 10
            }}
          >
            ✅ Save Pump
          </button>

          <button
            onClick={() => setShowForm(false)}
            style={{
              width: "100%",
              padding: 10,
              marginTop: 5,
              background: "#ccc",
              border: "none",
              borderRadius: 10
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
