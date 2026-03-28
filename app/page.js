"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>⛽ Fuel Map BD</h1>
      <Map />
    </div>
  );
}
