"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";

const SUBJECTS = [
  "Full-stack role",
  "Data analysis project",
  "Frontend project",
  "Backend project",
  "Collaboration",
  "Something else",
];

// My real links are here....
const LINKS = [
  {
    label: "Email",
    value: "chiemeriemchukwuemerie@email.com",
    href: "mailto:chiemeriemchukwuemerie@email.com",
  },
  {
    label: "GitHub",
    value: "github.com/iamemerie",
    href: "https://github.com/iamemerie",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/your-handle",
    href: "https://linkedin.com/in/your-handle",
  },
  {
    label: "Mobile & WhatsApp",
    value: "+234 803 929 6951",
    href: "tel:+2348039296951",
  },
];

const fieldClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition placeholder:text-neutral-600 focus:border-accent focus:bg-white/[0.06]";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: SUBJECTS[0],
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ text: string; ok: boolean } | null>(
    null,
  );

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (response.ok) {
        setStatus({ text: "Thanks. I'll reply soon.", ok: true });
        setForm({ name: "", email: "", subject: SUBJECTS[0], message: "" });
      } else {
        setStatus({ text: data.error ?? "Something went wrong.", ok: false });
      }
    } catch {
      setStatus({ text: "Network error. Please try again.", ok: false });
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-50">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* Left: headline, availability and links */}
          <div>
            <p className="font-label text-xs uppercase tracking-widest text-neutral-500">
              <span className="text-accent">●</span> Contact / 06
            </p>

            <h1 className="mt-6 font-heading text-6xl font-bold leading-[1.02] text-white md:text-7xl">
              Let&apos;s <span className="text-accent">make</span>
              <br />
              something for you.
            </h1>

            <p className="mt-6 max-w-md text-neutral-400">
              Open to full-stack and data roles, and to projects that need
              someone who can build the interface and analyse what it does.
            </p>

            <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
              {LINKS.map((link, i) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex items-center justify-between gap-6 py-5 transition"
                  >
                    <span className="flex items-center gap-5">
                      <span className="font-label text-xs text-neutral-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block font-label text-xs uppercase tracking-widest text-neutral-500">
                          {link.label}
                        </span>
                        <span className="mt-1 block text-lg text-white transition group-hover:text-accent">
                          {link.value}
                        </span>
                      </span>
                    </span>
                    <span className="text-neutral-600 transition group-hover:translate-x-1 group-hover:text-accent">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: the form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-neutral-950/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-10"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block font-label text-xs uppercase tracking-widest text-neutral-400"
                >
                  Name
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={fieldClass}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-label text-xs uppercase tracking-widest text-neutral-400"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={fieldClass}
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="subject"
                className="block font-label text-xs uppercase tracking-widest text-neutral-400"
              >
                What is it about
              </label>
              <select
                id="subject"
                value={form.subject}
                onChange={(e) => update("subject", e.target.value)}
                className={fieldClass}
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s} className="bg-neutral-950">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <label
                htmlFor="message"
                className="block font-label text-xs uppercase tracking-widest text-neutral-400"
              >
                Message <span className="text-neutral-600">(optional)</span>
              </label>
              <textarea
                id="message"
                rows={9}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className={fieldClass}
                placeholder="A few lines about what you have in mind"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
            >
              {sending ? "Sending..." : "Send message"} <span>→</span>
            </button>

            {status && (
              <p
                role="status"
                className={`mt-6 rounded-xl px-4 py-3 text-center text-sm ${
                  status.ok
                    ? "bg-accent/10 text-accent"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {status.text}
              </p>
            )}
          </form>
        </div>
      </main>
    </>
  );
}
