import HeroBackground from "./components/HeroBackground";
import HeroScene from "./components/HeroScene";
import GlowDivider from "./components/GlowDivider";
import Navbar from "./components/Navbar";

const sectionClass = "scroll-mt-28 mx-auto max-w-5xl px-6 py-24";
const labelClass =
  "font-label text-xs uppercase tracking-widest text-neutral-500";
const titleClass = "mt-3 font-display text-5xl text-white md:text-6xl";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-screen items-center overflow-hidden bg-[#0b0807] px-6 pt-32">
        <HeroBackground />

        <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="font-label text-xs uppercase tracking-widest text-neutral-400">
              <span className="text-accent">●</span> Portfolio / 2026 ·
              Full-stack developer &amp; data analyst
            </p>

            <h1 className="mt-6 font-display text-6xl leading-[1.02] tracking-tight text-white md:text-8xl">
              Building <em className="text-accent">data-driven</em>
              <br />
              things for the web.
            </h1>

            <p className="mt-8 max-w-xl text-lg text-neutral-400">
              I build full-stack applications in Python and Three.js, and I
              analyse the data behind them to decide what to build next.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                See my work <span>→</span>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Contact me
              </a>
            </div>
          </div>

          <div className="relative hidden h-[360px] lg:block">
            <HeroScene />
          </div>
        </div>
      </main>

      <GlowDivider />

      {/* Work: your projects go here */}
      <section id="work" className={sectionClass}>
        <p className={labelClass}>01 / Work</p>
        <h2 className={titleClass}>Selected projects</h2>
        <p className="mt-6 text-neutral-400">Project cards go here.</p>
      </section>

      <GlowDivider />

      {/* About: a short personal paragraph */}
      <section id="about" className={sectionClass}>
        <p className={labelClass}>02 / About</p>
        <h2 className={titleClass}>Who I am</h2>
        <p className="mt-6 text-neutral-400">About text goes here.</p>
      </section>

      <GlowDivider />

      {/* CV: your experience timeline */}
      <section id="cv" className={sectionClass}>
        <p className={labelClass}>03 / CV</p>
        <h2 className={titleClass}>Experience</h2>
        <p className="mt-6 text-neutral-400">Experience timeline goes here.</p>
      </section>

      <GlowDivider />

      {/* Academics: skills and tools */}
      <section id="academics" className={sectionClass}>
        <p className={labelClass}>04 / ACADEMICS</p>
        <h2 className={titleClass}>What I have obtained</h2>
        <p className="mt-6 text-neutral-400">Skills and Qualification.</p>
      </section>

      <GlowDivider />
    </>
  );
}
