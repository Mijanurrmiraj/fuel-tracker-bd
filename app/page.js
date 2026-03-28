"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function Home() {
  const [pumps, setPumps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [form, setForm] = useState({
    name: "",
    fuel: "Petrol",
    minutes: "",
  });

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "pumps"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setPumps(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!selectedLocation) return alert("Map থেকে location select করো!");

    await addDoc(collection(db, "pumps"), {
      ...form,
      minutes: parseInt(form.minutes),
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      createdAt: Date.now(),
    });

    setForm({ name: "", fuel: "Petrol", minutes: "" });
    setSelectedLocation(null);
    fetchData();
  };

  return (
    <div>
      {/* 🔥 Header */}
      <div style={{
        padding: "12px",
        background: "#111",
        color: "#fff",
        fontSize: "20px",
        fontWeight: "bold"
      }}>
        ⛽ Fuel Map BD
      </div>

      {/* 🗺️ Map */}
      <Map pumps={pumps} onMapClick={setSelectedLocation} />

      {/* 📍 Location Selected */}
      {selectedLocation && (
        <div style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          background: "#fff",
          padding: "15px",
          boxShadow: "0 -2px 10px rgba(0,0,0,0.2)"
        }}>
          <h3>Add Fuel Pump</h3>

          <input
            placeholder="Pump Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{ width: "100%", marginBottom: "8px" }}
          />

          <select
            value={form.fuel}
            onChange={(e) => setForm({ ...form, fuel: e.target.value })}
            style={{ width: "100%", marginBottom: "8px" }}
          >
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Octane</option>
          </select>

          <input
            placeholder="Minutes থাকবে"
            type="number"
            value={form.minutes}
            onChange={(e) => setForm({ ...form, minutes: e.target.value })}
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <button onClick={handleAdd} style={{
            width: "100%",
            padding: "10px",
            background: "green",
            color: "#fff",
            border: "none"
          }}>
            ✅ Save Pump
          </button>
        </div>
      )}
    </div>
  );
}
