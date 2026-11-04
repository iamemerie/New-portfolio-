export type Project = {
  title: string;
  meta: string; // e.g. "01 / Featured · Live"
  domain: string; // shown in the browser frame
  summary: string;
  result: string;
  stack: string[];
  image?: string; // a screenshot in public/projects/
  imageAlt?: string;
  live?: string; // leave out until the project has a public link
};

export const projects: Project[] = [
  {
    title: "E-Poultry",
    meta: "01 / Featured · Live",
    domain: "https://poultry-site-zeta.vercel.app/",
    summary:
      "A farm website with a Postgres backend: validated APIs for pre-orders, waiting lists, contact messages and newsletter sign-ups, and a live stock view built from the database.",
    result: "Live on Vercel, with a Postgres database and email sign-up.",
    stack: ["Next.js", "TypeScript", "Prisma", "Supabase", "Tailwind"],
    image: "/projects/E-poultry home page.png",
    imageAlt: "E-Poultry homepage with the hero and animal sections",
    live: "https://poultry-site-zeta.vercel.app/",
  },

  {
    title: "Academiq.app",
    meta: "02 / Featured · Live",
    domain: "www.a-cade-miq.app",
    summary:
      "An academic website used by Tutors and students around Nigeria for academic and research purpose built on React.js Express and MongoDB.",
    result: "Live on Vercel, with a NoSQL database and Goggle sign-up.",
    stack: ["React.js", "TypeScript", "MongoDB", "Express.js", "Tailwind"],
    image: "/projects/Academiq.png",
    imageAlt: "Academic.ng homepage",
    live: "www.a-cade-miq.app",
  },
];
