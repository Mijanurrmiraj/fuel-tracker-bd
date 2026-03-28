"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import "leaflet/dist/leaflet.css";

export default function Map() {
  const [pumps, setPumps] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "pumps"), (snapshot) => {
      setPumps(snapshot.docs.map(doc => doc.data()));
    });

    return () => unsub();
  }, []);

  const getTimeLeft = (endTime) => {
    const diff = endTime - Date.now();
    if (diff <= 0) return "❌ শেষ";
    return Math.floor(diff / 60000) + " min";
  };

  return (
    <MapContainer center={[23.685, 90.3563]} zoom={7} style={{ height: "80vh" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {pumps.map((pump, i) => (
        <Marker key={i} position={[pump.lat, pump.lng]}>
          <Popup>
            <b>{pump.name}</b><br />
            Fuel: {pump.fuel}<br />
            ⏳ {getTimeLeft(pump.endTime)}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
