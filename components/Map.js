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

// Fix marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Click map
function LocationMarker({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
}

export default function Map() {
  const [position, setPosition] = useState(null);
  const [pumps, setPumps] = useState([]);

  // Load Firebase data
  useEffect(() => {
    const pumpRef = ref(db, "pumps");

    onValue(pumpRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPumps(Object.values(data));
      }
    });
  }, []);

  // Save pump
  const savePump = () => {
    if (!position) return alert("লোকেশন সিলেক্ট করো!");

    const pumpRef = ref(db, "pumps");

    push(pumpRef, {
      lat: position.lat,
      lng: position.lng,
      time: Date.now(),
    });

    alert("Pump Added ✅");
  };

  return (
    <>
      <MapContainer
        center={[23.685, 90.3563]}
        zoom={7}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {pumps.map((p, i) => (
          <Marker key={i} position={[p.lat, p.lng]}>
            <Popup>Fuel Pump</Popup>
          </Marker>
        ))}

        {position && <Marker position={position}></Marker>}

        <LocationMarker setPosition={setPosition} />
      </MapContainer>

      {/* Floating Button */}
      <button
        onClick={savePump}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#ff5722",
          color: "#fff",
          padding: "14px",
          borderRadius: "50%",
          border: "none",
          fontSize: "18px",
        }}
      >
        +
      </button>
    </>
  );
}
