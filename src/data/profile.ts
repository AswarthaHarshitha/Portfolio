// TODO(harshitha): replace placeholder contact/bio fields with your real details.
// Anything marked PLACEHOLDER below is a draft — swap it for your own wording/links.

import { withBase } from "../lib/utils";

export const profile = {
  name: "Sugreevu Aswartha Harshitha",
  initials: "AH",
  title: "Full-Stack Developer & AI Engineer", // PLACEHOLDER — confirm preferred title
  tagline:
    "Building production-style software across full-stack, AI agents, enterprise systems, and data platforms.",
  // PLACEHOLDER bio — replace with your own words.
  bio: [
    "I build end-to-end software: full-stack web apps, AI agents that call real tools and APIs, enterprise systems with role-based workflows, and data platforms that turn raw numbers into decisions.",
    "Recent work spans a HIPAA-minded clinical documentation tool, a Gemini-powered Google Workspace assistant, an SAP Fiori work-order system, and a 108K-row enterprise analytics pipeline — with a focus on real correctness over demo polish: honest data, real auth, and no fabricated output.",
  ],
  location: "Kadapa, Andhra Pradesh, India",
  availability: "Available for freelance & full-time roles", // PLACEHOLDER — confirm
  links: {
    github: "https://github.com/AswarthaHarshitha",
    linkedin: "https://www.linkedin.com/in/s-harshitha-1aa69a258/",
    leetcode: "https://leetcode.com/u/AswarthaHarshitha/",
    codechef: "https://www.codechef.com/users/aswarthaharshi",
    email: "harshithasugreevu@gmail.com",
    phone: "+91 9063357593",
    resumeUrl: withBase("resume.pdf"),
  },
} as const;

export const coreExpertise = [
  {
    label: "Full-Stack Development",
    detail: "React, TypeScript, Node.js/Express, REST APIs, PostgreSQL, MongoDB",
  },
  {
    label: "AI & Agents",
    detail: "LLM function-calling, RAG, autonomous workflows, OpenAI / Gemini / Groq",
  },
  {
    label: "Data & Analytics",
    detail: "Python ETL, SQL, statistical analysis, Power BI, RFM segmentation",
  },
  {
    label: "Computer Vision",
    detail: "CNNs, U-Net, OpenCV, real-time inference pipelines",
  },
  {
    label: "SAP & Enterprise",
    detail: "SAPUI5, Fiori Elements, SAP CAP, OData V4, role-based workflows",
  },
  {
    label: "Cloud & Deployment",
    detail: "Docker, Google Cloud Run, Vertex AI, Vercel, CI-friendly builds",
  },
] as const;
