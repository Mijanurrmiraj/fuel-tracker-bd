import "../styles/globals.css";

export const metadata = {
  title: "Fuel Map BD",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
