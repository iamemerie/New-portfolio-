import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const heading = Syne({
  variable: "--font-heading-loaded",
  subsets: ["latin"],
  weight: ["800"],
});

const label = JetBrains_Mono({
  variable: "--font-label-loaded",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wisdom | Full-stack Developer & Data Analyst",
  description:
    "Portfolio of Wisdom, a full-stack developer working in Python and Three.js, and a data analyst.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${label.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
