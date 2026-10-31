import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import Cursor from "./components/Cursor";
import BackToTop from "./components/BackToTop";

const display = Instrument_Serif({
  variable: "--font-display-loaded",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Wisdom | Full-stack Developer & Data Analyst",
  description:
    "Portfolio of Wisdom, a full-stack developer working in Python and Three.js, and a data analyst.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Cursor />
        <BackToTop />
      </body>
    </html>
  );
}
