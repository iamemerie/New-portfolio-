import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Bricolage_Grotesque,
  Fraunces,
  IBM_Plex_Mono,
  Manrope,
} from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Cursor from "./components/Cursor";
import BackToTop from "./components/BackToTop";
import Spider from "./components/Spider";

// Headlines
const heading = Bricolage_Grotesque({
  variable: "--font-heading-loaded",
  subsets: ["latin"],
  display: "swap",
});

// Italic taglines and big section titles
const display = Fraunces({
  variable: "--font-display-loaded",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

// Small uppercase labels
const label = IBM_Plex_Mono({
  variable: "--font-label-loaded",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Navigation, buttons and body text
const ui = Manrope({
  variable: "--font-ui-loaded",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wisdom Chukwuemeka - Backend Developer & Data Analyst",
  description:
    "Wisdom Chukwuemeka builds Python backends, data pipelines and interactive web interfaces, and analyses the data behind them.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${heading.variable} ${label.variable} ${ui.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Cursor />
        <BackToTop />
        <Spider />
      </body>
    </html>
  );
}
