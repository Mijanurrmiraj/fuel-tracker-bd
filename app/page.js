"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { db } from "../lib/firebase";
import { ref, push, onValue } from "firebase/database";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const [pumps, setPumps] = useState([]);
  const [minutes, setMinutes] = useState("");
  const [fuelType, setFuelType] = useState("");

  // 🔥 Realtime sync (ALL DEVICE)
  useEffect(() => {
    const pumpsRef = ref(db, "pumps");

    onValue(pumpsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.values(data);
        setPumps(list);
      } else {
        setPumps([]);
      }
    });
  }, []);

  // ➕ Add Pump
  const addPump = (lat, lng) => {
    if (!minutes || !fuelType) {
      alert("সব ফিল্ড পূরণ করুন");
      return;
    }

    const pumpsRef = ref(db, "pumps");

    push(pumpsRef, {
      lat,
      lng,
      fuelType,
      minutes: parseInt(minutes),
      createdAt: Date.now()
    });

    alert("✅ Pump Added!");
    setMinutes("");
    setFuelType("");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>⛽ Fuel Map BD</h1>

      {/* INPUT FORM */}
      <div style={{ padding: 10 }}>
        <select
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
        >
          <option value="">Select Fuel</option>
          <option value="Petrol">Petrol</option>
          <option value="Octane">Octane</option>
          <option value="Diesel">Diesel</option>
        </select>

        <input
          type="number"
          placeholder="Minutes থাকবে"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
      </div>

      {/* MAP */}
      <Map pumps={pumps} onAddPump={addPump} />
    </div>
  );
}
