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
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        
        <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
        <link href="/assets/vendor/aos/aos.css" rel="stylesheet" />
        <link href="/assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet" />
        <link href="/assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" />

        <link href="/assets/css/main.css" rel="stylesheet" />
        <link href="/assets/css/redesign.css" rel="stylesheet" />
        <link href="/assets/css/visual-polish.css" rel="stylesheet" />
      </head>
      <body className="index-page">
        <Nav />
        {children}
        <Footer />
        <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" async></script>
      </body>
    </html>
  );
}
