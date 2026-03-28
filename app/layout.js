import "./globals.css";

export const metadata = {
  title: "Fuel Map BD",
  description: "Find fuel easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
