'use client';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

function AddMarker({ onAdd }) {
  useMapEvents({
    click(e) {
      const name = prompt("Pump Name?");
      const fuel = prompt("Fuel type? (Petrol/Diesel/Octane)");
      const minutes = prompt("কত মিনিট তেল থাকবে?");

      if (name && fuel && minutes) {
        onAdd({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          name,
          fuel,
          timeLeft: parseInt(minutes)
        });
      }
    },
  });

  return null;
}

export default function Map() {
  const [pumps, setPumps] = useState([]);

  // 🔥 Load from Firebase
  useEffect(() => {
    const loadData = async () => {
      const querySnapshot = await getDocs(collection(db, "pumps"));
      const data = querySnapshot.docs.map(doc => doc.data());
      setPumps(data);
    };
    loadData();
  }, []);

  // 🔥 Countdown system
  useEffect(() => {
    const interval = setInterval(() => {
      setPumps(prev =>
        prev.map(p => ({
          ...p,
          timeLeft: p.timeLeft > 0 ? p.timeLeft - 1 : 0
        }))
      );
    }, 60000); // প্রতি ১ মিনিটে কমবে

    return () => clearInterval(interval);
  }, []);

  const handleAdd = async (data) => {
    await addDoc(collection(db, "pumps"), data);
    setPumps(prev => [...prev, data]);
  };

  return (
    <>
      <MapContainer center={[23.6850, 90.3563]} zoom={7} style={{ height: "60vh" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <AddMarker onAdd={handleAdd} />

        {pumps.map((p, i) => (
          <Marker key={i} position={[p.lat, p.lng]}>
            <Popup>
              <b>{p.name}</b><br />
              ⛽ {p.fuel}<br />
              ⏳ {p.timeLeft} মিনিট বাকি
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* 🔥 Premium List UI */}
      <div style={{ padding: 15 }}>
        <h2>⛽ Live Fuel Status</h2>

        {pumps.map((p, i) => (
          <div key={i} style={{
            background: "#111",
            color: "#fff",
            padding: 12,
            margin: "10px 0",
            borderRadius: 10
          }}>
            <h3>{p.name}</h3>
            <p>Fuel: {p.fuel}</p>
            <p>⏳ {p.timeLeft} মিনিট বাকি</p>
          </div>
        ))}
      </div>
    </>
  );
}
import { db } from "../firebase";
