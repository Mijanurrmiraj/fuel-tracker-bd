"use client";

import Map from "@/components/Map";
import { db } from "@/lib/firebase";
import { ref, push, onValue } from "firebase/database";
import { useEffect, useState } from "react";

export default function Home() {
  const [pumps, setPumps] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [name, setName] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [minutes, setMinutes] = useState("");

  // 🔥 Load realtime data
  useEffect(() => {
    const pumpRef = ref(db, "pumps");

    onValue(pumpRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return setPumps([]);

      const list = Object.values(data);
      setPumps(list);
    });
  }, []);

  // 🔥 Add pump
  const addPump = (loc) => {
    setSelectedLocation(loc);
    setFormOpen(true);
  };

  const savePump = () => {
    if (!name || !fuelType || !minutes) {
      return alert("সব পূরণ করো");
    }

    push(ref(db, "pumps"), {
      name,
      fuelType,
      minutes,
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      createdAt: Date.now()
    });

    setFormOpen(false);
    setName("");
    setFuelType("");
    setMinutes("");
  };

  return (
    <>
      {/* Header */}
      <div className="header">
        ⛽ Fuel Map BD
      </div>

      {/* Map */}
      <Map pumps={pumps} addPump={addPump} />

      {/* Bottom Form */}
      {formOpen && (
        <div className="bottomSheet">
          <h3>Add Fuel Pump</h3>

          <input
            placeholder="Pump Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select onChange={(e) => setFuelType(e.target.value)}>
            <option>Select Fuel</option>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Octane</option>
          </select>

          <input
            placeholder="Minutes থাকবে"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />

          <button onClick={savePump}>Save Pump</button>
        </div>
      )}

      {/* Footer */}
      <div className="footer">
        Developed by 
        <a href="https://www.facebook.com/mijanurrmiraj" target="_blank">
          Mijanur R. Miraj
        </a>
      </div>
    </>
  );
}
