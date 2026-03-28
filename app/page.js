import dynamic from "next/dynamic";

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
      <Map />

      {/* 🔥 Developer Credit */}
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#ffffff",
          padding: "6px 14px",
          borderRadius: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          fontSize: "13px",
          zIndex: 999,
        }}
      >
        made by{" "}
        <a
          href="https://www.facebook.com/mijanurrmiraj"
          target="_blank"
          style={{
            color: "#007bff",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Mijanur R. Miraj
        </a>
      </div>
    </main>
  );
}
