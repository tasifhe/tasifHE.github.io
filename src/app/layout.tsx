import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { AosInit } from "../components/AosInit";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/redesign.css";
import "./globals.css"; // We will put minimal overrides here

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Tasif Hossain Emon | Game Developer & Level Designer",
  description: "Portfolio of Tasif Hossain Emon, Game Developer & Level Designer specializing in procedural generation, systems, and tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="index-page">
        <AosInit />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
