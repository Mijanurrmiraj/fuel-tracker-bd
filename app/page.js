"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const [pumps, setPumps] = useState([]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "pumps"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setPumps(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addPump = async () => {
    const name = prompt("Pump Name?");
    const fuel = prompt("Fuel Type? (Petrol/Diesel/Octane)");
    const minutes = prompt("How many minutes fuel available?");

    await addDoc(collection(db, "pumps"), {
      name,
      fuel,
      minutes,
      lat: 23.685,
      lng: 90.3563,
    });

    fetchData();
  };

  return (
    <div>
      <h1>⛽ Fuel Map BD</h1>
      <button onClick={addPump}>+ Add Pump</button>

      <Map pumps={pumps} />
    </div>
  );
}
