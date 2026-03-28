"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";
import { db } from "./firebase";

import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

export default function Map() {
  const [pumps, setPumps] = useState([]);

  // 🔥 Load data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "pumps"));
      const data = querySnapshot.docs.map(doc => doc.data());
      setPumps(data);
    };

    fetchData();
  }, []);

  // ➕ Add Pump
  const addPump = async () => {
    const name = prompt("Pump name?");
    const lat = prompt("Latitude?");
    const lng = prompt("Longitude?");
    const fuel = prompt("Fuel type?");
    const time = prompt("Minutes available?");

    const newPump = {
      name,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      fuel,
      time
    };

    // 🔥 Save to Firebase
    await addDoc(collection(db, "pumps"), newPump);

    // update UI instantly
    setPumps([...pumps, newPump]);
  };

  return (
    <div>
      <button onClick={addPump}>+ Add Pump</button>

      <MapContainer
        center={[23.685, 90.3563]}
        zoom={7}
        style={{ height: "90vh" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {pumps.map((pump, i) => (
          <Marker key={i} position={[pump.lat, pump.lng]}>
            <Popup>
              <b>{pump.name}</b><br/>
              Fuel: {pump.fuel} <br/>
              Time: {pump.time} min
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
