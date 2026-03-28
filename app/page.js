"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function Home() {
  const [pumps, setPumps] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Firebase থেকে data load
  const fetchData = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "pumps"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setPumps(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ➕ Pump add function
  const addPump = async () => {
    const name = prompt("Pump Name?");
    if (!name) return;

    const fuel = prompt("Fuel Type? (Petrol / Diesel / Octane)");
    if (!fuel) return;

    const minutes = parseInt(prompt("কত মিনিট তেল থাকবে?"));
    if (!minutes) return;

    setLoading(true);

    await addDoc(collection(db, "pumps"), {
      name,
      fuel,
      minutes,
      lat: 23.685, // পরে GPS দিবো
      lng: 90.3563,
      createdAt: Date.now(),
    });

    await fetchData();
  };

  return (
    <div>
      {/* 🔥 Header */}
      <div
        style={{
          padding: "10px",
          background: "#111",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h2 style={{ margin: 0 }}>⛽ Fuel Map BD</h2>
      </div>

      {/* ➕ Button */}
      <div style={{ padding: "10px" }}>
        <button
          onClick={addPump}
          style={{
            padding: "10px 15px",
            background: "green",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          + Add Pump
        </button>
      </div>

      {/* ⏳ Loading */}
      {loading && (
        <p style={{ padding: "10px" }}>Loading...</p>
      )}

      {/* 🗺️ Map */}
      <Map pumps={pumps} />
    </div>
  );
}
