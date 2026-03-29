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

    {/* 🔥 TOP AD (NEW SCRIPT) */}
<div
  style={{
    position: "fixed",
    top: "60px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 9999,
  }}
>
  <Script
    src="https://pl29006565.profitablecpmratenetwork.com/35/85/64/358564c61f1df6c62752f23bba03e089.js"
    strategy="afterInteractive"
  />
</div>

      {/* 🗺️ MAP */}
      <Map />

      {/* 🔥 Developer Credit + Bottom Ad Combo */}
      <div
        style={{
          position: "fixed",
          bottom: "15px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          textAlign: "center",
        }}
      >
        {/* Developer */}
        <div
          style={{
            background: "rgba(0,0,0,0.8)",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "15px",
            fontSize: "12px",
            marginBottom: "6px",
          }}
        >
          Developed by{" "}
          <a
            href="https://www.facebook.com/mijanurrmiraj"
            target="_blank"
            style={{ color: "#00ffcc", textDecoration: "none" }}
          >
            Mijanur R. Miraj
          </a>
        </div>

        {/* Bottom Ad (optional future use) */}
        <div id="bottom-ad"></div>
      </div>

    </main>
  );
}
