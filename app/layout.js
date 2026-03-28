iimport "./globals.css";

export const metadata = {
  title: "Fuel Map BD",
  description: "Fuel finder app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
