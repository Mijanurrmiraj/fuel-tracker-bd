'use client';

import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  return <h1>Fuel Map BD</h1>;
}
      <Map />
    </div>
  );
}
