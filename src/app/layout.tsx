import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import PageWrapper from "@/components/PageWrapper";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Smartotels",
  description: "Hospitality Structured with the Rigor of Finance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} font-sans antialiased bg-black text-white`}
      >
        <SmoothScroll>
          <Preloader />

          <Navbar />
          <PageWrapper>{children}</PageWrapper>
        </SmoothScroll>
      </body>
    </html>
  );
}
