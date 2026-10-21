"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Build", href: "/#build" },
  { label: "About", href: "/about" },
  { label: "CV", href: "/cv" },
  { label: "Academics", href: "/academics" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto max-w-5xl">
        <nav
          className={`flex items-center justify-between rounded-full border px-5 py-2.5 backdrop-blur-xl transition-all duration-300 ${
            scrolled
              ? "border-white/10 bg-black/80 shadow-2xl shadow-black/50"
              : "border-white/10 bg-neutral-900/60 shadow-lg shadow-black/20"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center pl-1">
            <span className="text-6xl font-black tracking-tight text-white">
              W<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium tracking-wide transition-colors duration-200 ${
                      active
                        ? "bg-white/10 text-white"
                        : "text-neutral-400 hover:text-accent"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Call to Action */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-sm font-label text-black transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              Book a call <span className="text-sm">→</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-9 w-9 place-items-center rounded-full text-neutral-300 transition hover:bg-white/10 hover:text-white md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {open && (
          <div
            id="mobile-menu"
            className="mt-2 rounded-2xl border border-white/10 bg-neutral-950/90 p-4 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? "bg-white/10 text-white"
                          : "text-neutral-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 block w-full rounded-full bg-accent py-2.5 text-center text-sm font-bold text-black"
            >
              Book a call →
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
