const labelClass =
  "font-label text-xs uppercase tracking-widest text-neutral-500";

const FACTS = [
  {
    label: "Focus",
    value: "Full-stack development, data analysis",
  },
  { label: "Languages", value: "Python, JavaScript, TypeScript, SQL" },
  { label: "Frameworks", value: "Next.js, React, Three.js, Prisma, Supabase" },
  { label: "Based in", value: "Abuja, Nigeria" },
];

const PRINCIPLES = [
  {
    title: "Build it, then measure it",
    text: "I like to ship something real early, then use data to decide what to improve next.",
  },
  {
    title: "Make the heavy parts feel light",
    text: "Heavy 3D and data work should load fast and stay smooth on a phone, not only on a good laptop.",
  },
  {
    title: "Keep the code readable",
    text: "Clear structure and small, named pieces make a project easier to change, and easier to hand over.",
  },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-28  mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div>
          <p className={labelClass}>
            <span className="text-accent">●</span> 02 / About
          </p>
          <h2 className="mt-3 font-ui text-5xl leading-[1.02] text-white md:text-6xl">
            I build for the web,
            <br />
            and <span className="text-accent">measure</span> what happens.
          </h2>

          <div className="mt-10 space-y-5 text-lg font-ui leading-relaxed text-neutral-400">
            <p>
              My journey into coding started with curiosity and a desire to
              understand how technology works. I began learning web development
              at GoMyCode Tunisia, exploring HTML, CSS, JavaScript, and
              eventually moving into React and backend technologies. What drew
              me to the web was the ability to turn ideas into functional
              products that solve real problems. Building projects like Academiq
              has strengthened my passion for creating meaningful digital
              experiences, learning new technologies, and constantly improving
              as a developer.
            </p>
            <p>
              Internship with a Growing tech entrepreneur in Italy, where I
              worked on a project that involved building a web application for
              Footballing NGO and analyzing data. This experience allowed me to
              apply my skills in a real-world setting, collaborate with a team,
              and gain insights into the software development lifecycle. It also
              reinforced my interest in data analysis and how it can inform
              decision-making in web development.
            </p>
          </div>
        </div>

        <aside className="h-fit rounded-3xl border border-white/10 bg-neutral-950/70 p-15 backdrop-blur-xl">
          <p className={labelClass}>At a glance</p>
          <dl className="mt-6 divide-y divide-white/10">
            {FACTS.map((fact) => (
              <div key={fact.label} className="py-4">
                <dt className={labelClass}>{fact.label}</dt>
                <dd className="mt-1 text-white">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <div className="mt-28">
        <p className={labelClass}>How I work</p>
        <h3 className="mt-3 font-ui text-4xl text-white md:text-5xl">
          Three things I come back to
        </h3>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <article
              key={p.title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-accent/40"
            >
              <p className="font-label text-xs text-neutral-600">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h4 className="mt-6 font-heading text-2xl text-white">
                {p.title}
              </h4>
              <p className="mt-4 text-neutral-400">{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
