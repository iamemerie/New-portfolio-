import { education, experience, skills } from "@/app/data/cv";

const labelClass = "font-ui text-xs uppercase tracking-widest text-neutral-500";

export default function CV() {
  return (
    <section id="cv" className="scroll-mt-24  mx-auto max-w-5xl px-6 py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className={labelClass}>
            <span className="text-accent">●</span> 03 / CV
          </p>
          <h2 className="mt-3 font-heading text-5xl text-white md:text-6xl">
            Experience
          </h2>
        </div>

        {/* Put your PDF in public/cv.pdf so this link works */}
        <a
          href="/cv.pdf"
          download
          className="inline-flex items-center font-ui gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
        >
          Download <span className="text-accent">Resume</span> <span>↓</span>
        </a>
      </div>

      {/* Experience timeline */}
      <ol className="relative mt-16 space-y-12 border-l border-white/10 pl-8">
        {experience.map((job) => (
          <li key={`${job.role}-${job.org}`} className="relative">
            <span className="absolute -left-[37px] top-2 h-3 w-3 rounded-full bg-accent shadow-[0_0_12px_rgba(201,138,75,0.6)]" />
            <p className={labelClass}>{job.period}</p>
            <h3 className="mt-2 font-heading text-2xl text-white">
              {job.role}
            </h3>
            <p className="mt-1 text-neutral-500">{job.org}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-400">
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      {/* Education */}
      <div className="mt-20">
        <p className={labelClass}>Education</p>
        <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
          {education.map((item) => (
            <li
              key={item.title}
              className="flex flex-wrap items-baseline justify-between gap-4 py-5"
            >
              <div>
                <p className="font-heading text-xl text-white">{item.title}</p>
                <p className="mt-1 text-neutral-500">{item.org}</p>
              </div>
              <p className={labelClass}>{item.period}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Skills */}
      <div className="mt-20 grid gap-8 md:grid-cols-3">
        {skills.map((group) => (
          <div key={group.group}>
            <p className={labelClass}>{group.group}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 px-3 py-1 font-label text-xs uppercase tracking-wide text-neutral-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
