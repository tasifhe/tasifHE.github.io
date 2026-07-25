import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import "./globals.css"; // We will put minimal overrides here

export const metadata: Metadata = {
  title: "Tasif Hossain Emon | Game Designer & Developer",
  description: "Portfolio of Tasif Hossain Emon, Lead Game Designer & Unity Developer specializing in procedural generation, systems, and tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" rel="stylesheet" />
        <link href="/assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet" />
        <link href="/assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" />

        <link href="/assets/css/redesign.css" rel="stylesheet" />
      </head>
      <body className="index-page">
        <Nav />
        {children}
        <Footer />
        <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" async></script>
        <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js" async></script>
        <script src="/assets/js/main.js" async></script>
      </body>
    </html>
  );
}
