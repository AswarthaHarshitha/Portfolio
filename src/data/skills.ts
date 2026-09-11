// Curated, de-duplicated view of the tech actually used across the shipped
// projects in `projects.ts` and the expertise summary in `profile.ts` —
// grouped for the Tech Stack section. Nothing here is aspirational.
export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Java", "C++", "SQL"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Vite", "Tailwind CSS", "Framer Motion", "Three.js"],
  },
  {
    label: "Backend & APIs",
    items: ["Node.js", "Express", "FastAPI", "Spring Boot", "Spring Data JPA", "Prisma", "Drizzle ORM", "REST APIs"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "SQLite", "MongoDB Atlas"],
  },
  {
    label: "Core Concepts",
    items: ["DSA", "OOP", "DBMS", "Operating Systems", "Software Engineering", "Design Patterns"],
  },
  {
    label: "AI & GenAI",
    items: ["OpenAI GPT-4o", "Google Gemini", "Groq", "Hugging Face Transformers", "LLM Function-Calling", "RAG"],
  },
  {
    label: "ML & Computer Vision",
    items: ["TensorFlow", "Keras", "scikit-learn", "OpenCV", "U-Net (CNN)", "MediaPipe"],
  },
  {
    label: "Cloud & DevOps",
    items: ["Docker", "Google Cloud Run", "Vertex AI", "Vercel", "Netlify", "Render"],
  },
  {
    label: "SAP & Enterprise",
    items: ["SAPUI5", "SAP Fiori Elements", "SAP CAP", "OData V4"],
  },
  {
    label: "Data & Analytics",
    items: ["Pandas", "NumPy", "SciPy", "Power BI / DAX", "RFM Segmentation"],
  },
  {
    label: "Tools",
    items: ["Git", "GitHub", "Visual Studio Code"],
  },
];

export const allSkills = Array.from(new Set(skillGroups.flatMap((g) => g.items)));
