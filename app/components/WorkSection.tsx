import Image from "next/image";
import { projects } from "@/app/data/projects";

// A soft diagonal pattern in the accent colour, behind each preview.
const stripes =
  "repeating-linear-gradient(135deg, rgba(34,211,238,0.07) 0 12px, transparent 12px 24px)";

export default function WorkSection() {
  return (
    <section id="work" className="scroll-mt-28 mx-auto max-w-5xl px-6 py-24">
      <p className="font-label text-xs uppercase tracking-widest text-neutral-500">
        01 / Build
      </p>
      <h2 className="mt-3 font-display text-5xl text-white md:text-6xl">
        My projects
      </h2>

      <div className="mt-16 space-y-20">
        {projects.map((p, i) => {
          const flip = i % 2 === 1;

          return (
            <article
              key={p.title}
              className="grid items-center gap-10 md:grid-cols-2"
            >
              {/* Preview: browser frame over a striped  panel */}
              <div
                className={`rounded-3xl border border-white/10 bg-neutral-950 p-6 ${
                  flip ? "md:order-2" : ""
                }`}
                style={{ backgroundImage: stripes }}
              >
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                  <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="ml-3 font-label text-xs text-neutral-500">
                      {p.domain}
                    </span>
                  </div>

                  <div className="relative aspect-[4/3]">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.imageAlt ?? p.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="grid h-full place-items-center font-label text-xs text-neutral-600">
                        Preview coming soon
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className={flip ? "md:order-1" : ""}>
                <p className="font-label text-xs uppercase tracking-widest text-neutral-500">
                  {p.meta}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 px-3 py-1 font-label text-xs uppercase tracking-wide text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="mt-6 font-display text-5xl text-white md:text-6xl">
                  {p.title}
                </h3>
                <p className="mt-5 text-neutral-400">{p.summary}</p>
                <p className="mt-4 text-sm text-accent">{p.result}</p>

                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-transform duration-200 hover:scale-105"
                  >
                    Open live site <span>↗</span>
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
