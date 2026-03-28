import 'leaflet/dist/leaflet.css';

export const metadata = {
  title: 'Fuel Map',
  description: 'Fuel Pump Finder'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
