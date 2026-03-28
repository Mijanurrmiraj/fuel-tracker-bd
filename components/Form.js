'use client';

import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Form() {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async () => {
    const lat = prompt("Latitude দাও");
    const lng = prompt("Longitude দাও");

    await addDoc(collection(db, "pumps"), {
      name,
      time,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    });

    alert("Added!");
  };

  return (
    <div style={{ padding: 10 }}>
      <input placeholder="Pump Name" onChange={e => setName(e.target.value)} />
      <input placeholder="সময় (যেমন ৫টা)" onChange={e => setTime(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}
