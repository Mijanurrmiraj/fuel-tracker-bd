import dynamic from "next/dynamic";
import Script from "next/script";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "18px",
      }}
    >
      ⏳ Map Loading...
    </div>
  ),
});
export default function Home() {
  return (
    <main style={{ height: "100vh", width: "100%", position: "relative" }}>

      {/* 🔥 TOP AD */}
      <div
        style={{
          position: "fixed",
          top: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 999,
        }}
      >
        <Script id="ad-options" strategy="afterInteractive">
          {`
            var atOptions = {
              key: 'd116af3e9f488e6e92cf7b9f8bed5696',
              format: 'iframe',
              height: 250,
              width: 300,
              params: {}
            };
          `}
        </Script>

        <Script
          src="https://www.highperformanceformat.com/d116af3e9f488e6e92cf7b9f8bed5696/invoke.js"
          strategy="afterInteractive"
        />
      </div>

      {/* 🗺️ MAP */}
      <Map />

      {/* 🔥 Developer Credit */}
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#000",
          color: "#fff",
          padding: "6px 12px",
          borderRadius: "10px",
          fontSize: "12px",
        }}
      >
        Developed by{" "}
        <a
          href="https://www.facebook.com/mijanurrmiraj"
          target="_blank"
          style={{ color: "#00ffcc" }}
        >
          Mijanur R. Miraj
        </a>
      </div>

    </main>
  );
}
