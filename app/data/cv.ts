// Fill in the bracketed entries with your real experience.

export type Role = {
  role: string;
  org: string;
  period: string;
  points: string[]; // one line each: what you did, and a result you can back up
};

export type Education = {
  title: string;
  org: string;
  period: string;
};

export type SkillGroup = {
  group: string;
  items: string[];
};

export const experience: Role[] = [
  {
    role: "Full Stack developer",
    org: "Internship",
    period: "2026 – Present",
    points: [
      "An E-poultry farm management system that allows farmers to manage their poultry farms efficiently.",
      "Academiqs is a web application that allows students to access their academic records and other information.",
    ],
  },
];

export const education: Education[] = [
  {
    title: "BSc Zoology and Environmental Science",
    org: "University of Nigeria Nsukka, Enugu State",
    period: "(2019-2024)",
  },
];

export const skills: SkillGroup[] = [
  {
    group: "Build",
    items: [
      "Python",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  { group: "Data", items: ["SQL", "MongoDB", "Excel", "Analysis"] },
  { group: "Platforms", items: ["Prisma", "Supabase", "Vercel", "Git"] },
];
