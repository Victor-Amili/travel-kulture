import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "TravelKulture | Experience Nigeria",
  description: "Immersive cultural tours, travel experiences and souvenirs from TravelKulture.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="radio-bar">🎙️ TravelKulture on <strong>Smooth FM 98.1 — Fridays at 2PM</strong></div>
        {children}
        <Footer />
      </body>
    </html>
  );
}