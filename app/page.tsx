import HeroBackground from "./components/HeroBackground";
import HeroScene from "./components/HeroScene";
import GlowDivider from "./components/GlowDivider";
import WorkSection from "./components/WorkSection";
import About from "./components/About";
import CV from "./components/CV";
import Navbar from "./components/Navbar";

const sectionClass = "scroll-mt-28 w-full px-6 py-24";
const labelClass =
  "font-label text-xs uppercase tracking-widest text-neutral-500";
const titleClass = "mt-3 font-display text-5xl text-white md:text-6xl";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-screen items-center overflow-hidden bg-[#0b0807] px-6 pt-32">
        <HeroBackground />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="text-xs font-ui uppercase tracking-widest text-neutral-400">
              <span className="text-accent">●</span> Portfolio / 2026 · Backend
              developer &amp; data analyst
            </p>

            <h1 className="mt-6 font-heading text-3xl leading-[1.02] tracking-tight text-white md:text-8xl">
              Backend first,
              <br />
              with the <span className="text-accent">data</span> to check it.
            </h1>

            <p className="mt-8 max-w-xl text-md text-neutral-400 font-ui">
              I'm Wisdom Chukwuemeka. I build backend systems and the interfaces
              on top of them, then analyse the data they produce to decide what
              to fix next.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/CV.pdf"
                className="inline-flex items-center gap-2 rounded-full font-ui border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Credentials <span>→</span>
              </a>
            </div>
          </div>

          <div className="relative hidden h-[320px] lg:block">
            <HeroScene />
          </div>
        </div>
      </main>

      <GlowDivider />

      {/* Work: your projects go here */}
      <section id="work" className={sectionClass}>
        <WorkSection />
      </section>

      <GlowDivider />

      {/* About: a short personal paragraph */}
      <section id="about" className={sectionClass}>
        <About />
      </section>

      <GlowDivider />

      {/* CV: your experience timeline */}
      <section id="cv" className={sectionClass}>
        <CV />
      </section>

      <GlowDivider />
    </>
  );
}
