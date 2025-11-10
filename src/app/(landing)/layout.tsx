import type { Metadata } from "next";
import { Nunito_Sans, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
  preload: true,
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Brillance - Effortless Custom Contract Billing",
  description:
    "Streamline your billing process with seamless automation for every custom contract, tailored by Brillance.",
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        nunitoSans.variable,
        playfairDisplay.variable,
        "scroll-smooth font-sans antialiased",
      )}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
