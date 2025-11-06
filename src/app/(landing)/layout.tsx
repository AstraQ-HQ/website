import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import type React from "react";
import "@/app/globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Brillance - Effortless Custom Contract Billing",
  description:
    "Streamline your billing process with seamless automation for every custom contract, tailored by Brillance.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        inter.variable,
        instrumentSerif.variable,
        "antialiased font-sans scroll-smooth",
      )}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
