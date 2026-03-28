"use client";

import dynamic from "next/dynamic";
import AddPump from "../components/AddPump";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function Page() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>⛽ Fuel Map BD</h1>
      <AddPump />
      <Map />
    </div>
  );
}
