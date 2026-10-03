import "./globals.css";

export const metadata = {
  title: "Catatan Kelas | Backend Intermediate",
  description: "Demo catatan kelas untuk praktikum Docker Compose.",
};

export default function RootLayout({ children }) {
  return <html lang="id"><body>{children}</body></html>;
}
