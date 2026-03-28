"use client";

import { useState } from "react";
import { db } from "../lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function AddPump() {
  const [name, setName] = useState("");
  const [fuel, setFuel] = useState("Petrol");
  const [time, setTime] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const handleSubmit = async () => {
    await addDoc(collection(db, "pumps"), {
      name,
      fuel,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      endTime: Date.now() + time * 60000,
    });

    alert("Pump Added ✅");
  };

  return (
    <div style={{ padding: 10 }}>
      <input placeholder="Pump Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Latitude" onChange={(e) => setLat(e.target.value)} />
      <input placeholder="Longitude" onChange={(e) => setLng(e.target.value)} />

      <select onChange={(e) => setFuel(e.target.value)}>
        <option>Petrol</option>
        <option>Diesel</option>
        <option>Octane</option>
      </select>

      <input
        placeholder="Minutes (e.g 60)"
        onChange={(e) => setTime(e.target.value)}
      />

      <button onClick={handleSubmit}>Add Pump</button>
    </div>
  );
}
