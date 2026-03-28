'use client';

import { useEffect, useState } from 'react';
import Map from '../components/Map';
import Form from '../components/Form';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Home() {
  const [pumps, setPumps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "pumps"));
      const data = querySnapshot.docs.map(doc => doc.data());
      setPumps(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Form />
      <Map pumps={pumps} />

      <div style={{ padding: 10 }}>
        <h3>📍 Fuel Available</h3>
        {pumps.map((p, i) => (
          <div key={i}>
            <b>{p.name}</b> - {p.time}
          </div>
        ))}
      </div>
    </>
  );
}
