import { withBase } from "../lib/utils";

export type Role =
  | "sde"
  | "fullstack"
  | "backend"
  | "ai-ml"
  | "genai"
  | "data"
  | "cv"
  | "sap"
  | "java";

export type Category =
  | "AI & Intelligent Systems"
  | "Full-Stack Engineering"
  | "Data & Analytics"
  | "Computer Vision"
  | "SAP & Enterprise Applications"
  | "Backend & APIs"
  | "Cloud & GenAI"
  | "Algorithms & Academic";

export interface Project {
  id: string;
  /** Shown on the project card — a real screenshot (`image`) always wins when present. */
  emoji: string;
  title: string;
  repo: string;
  tagline: string;
  description: string;
  tech: string[];
  categories: Category[];
  roles: Role[];
  demo?: string;
  github: string;
  featured: boolean;
  year: number;
  /** Real screenshot of the live demo, used by the featured showcase carousel. */
  image?: string;
}

// Tech keywords that mark a stack entry as characteristic of a given role —
// used to surface the *relevant* tech first when only a few slots are shown
// (e.g. the featured showcase). Only the roles with a genuinely distinctive
// stack get an entry; generic roles (sde/fullstack/backend) are left out on
// purpose so their tech keeps its natural order instead of being reshuffled.
const ROLE_TECH_KEYWORDS: Partial<Record<Role, string[]>> = {
  "ai-ml": ["TensorFlow", "Keras", "scikit-learn", "PyTorch", "ONNX", "Hugging Face", "CNN", "U-Net", "DistilGPT2", "Transformers"],
  genai: ["Gemini", "GPT", "OpenAI", "Groq", "LLM", "RAG", "ChatGPT", "Hugging Face", "Vertex AI"],
  cv: ["OpenCV", "MediaPipe", "CNN", "U-Net", "TensorFlow"],
  sap: ["SAPUI5", "SAP Fiori", "SAP CAP", "OData", "CDS", "HANA"],
  java: ["Java", "Spring Boot", "Swing"],
  data: ["Pandas", "NumPy", "SciPy", "SQL", "Power BI", "DAX", "OpenPyXL", "Pytest"],
};

/** Picks the `count` most role-relevant tech entries for a project, role-specific ones first. */
export function highlightTech(project: Project, count = 3): string[] {
  const keywords = Array.from(new Set(project.roles.flatMap((r) => ROLE_TECH_KEYWORDS[r] ?? [])));
  if (keywords.length === 0) return project.tech.slice(0, count);

  const isRoleTech = (tech: string) => keywords.some((k) => tech.toLowerCase().includes(k.toLowerCase()));
  const relevant = project.tech.filter(isRoleTech);
  const rest = project.tech.filter((t) => !isRoleTech(t));
  return [...relevant, ...rest].slice(0, count);
}

const GH = "https://github.com/AswarthaHarshitha";

export const projects: Project[] = [
  {
    id: "clinicalnote",
    emoji: "🩺",
    title: "ClinicalNote",
    repo: "Clinicalnote",
    tagline: "Voice-to-clinical-note documentation tool for healthcare",
    description:
      "A voice-to-clinical-note tool for clinicians: real speech-to-text transcription (Groq Whisper) is structured into an editable SOAP note by an LLM (Gemini), validated with Zod, backed by a deterministic safety layer that flags missing or contradictory findings, versioned note history, and multi-tenant, organization-scoped access control. No seeded data or fabricated AI output anywhere in the codebase.",
    tech: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "TanStack Query",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Argon2",
      "Groq",
      "Gemini",
    ],
    categories: ["AI & Intelligent Systems", "Full-Stack Engineering"],
    roles: ["sde", "fullstack", "genai", "ai-ml"],
    demo: "https://clinicalnote-nu.vercel.app",
    github: `${GH}/Clinicalnote`,
    image: withBase("images/projects/clinicalnote.jpg"),
    featured: true,
    year: 2026,
  },
  {
    id: "jarvis",
    emoji: "🤖",
    title: "JARVIS AI Assistant",
    repo: "JARVIS-Personal-Assistant",
    tagline: "AI assistant that manages Gmail, Calendar & Sheets",
    description:
      "A personal AI assistant for Google Workspace. Gemini's function-calling loop routes intents to Gmail, Calendar, and Sheets tools and streams responses over Server-Sent Events; OAuth tokens are AES-256-GCM encrypted, and the Express backend automatically falls back to embedded SQLite when Postgres isn't configured. Ships with a glassmorphic Next.js interface and a from-scratch particle HUD.",
    tech: [
      "Next.js",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "SQLite",
      "Google Gemini API",
      "OAuth 2.0",
      "Server-Sent Events",
    ],
    categories: ["AI & Intelligent Systems", "Cloud & GenAI"],
    roles: ["sde", "genai", "ai-ml"],
    demo: "https://harshitha-jarvis-assistant.netlify.app/",
    github: `${GH}/JARVIS-Personal-Assistant`,
    featured: true,
    year: 2026,
  },
  {
    id: "booking-platform",
    emoji: "📅",
    title: "Intelligent Booking Orchestration Platform",
    repo: "Intelligent-Booking-Orchestration-Platform",
    tagline: "Conversational AI booking assistant with autonomous delegation",
    description:
      "An AI booking assistant built with Streamlit that goes beyond CRUD: conversational intent/slot extraction, fuzzy time resolution ('after lunch', 'evening'), rule-based autonomy for AI-delegated decisions, calendar conflict resolution with best-slot selection, per-field confidence/explainability scoring, and resilient PDF-to-text receipt generation with SQLite/JSON persistence.",
    tech: ["Python", "Streamlit", "SQLite", "ReportLab", "gTTS"],
    categories: ["AI & Intelligent Systems", "Backend & APIs"],
    roles: ["sde", "backend", "ai-ml", "genai"],
    github: `${GH}/Intelligent-Booking-Orchestration-Platform`,
    featured: true,
    year: 2026,
  },
  {
    id: "talent-marketplace",
    emoji: "💼",
    title: "Talent & Freelance Marketplace",
    repo: "Talent-and-Freelance-Marketplace",
    tagline: "LinkedIn-and-Upwork-inspired job platform with AI + Web3",
    description:
      "A full-stack job and networking platform combining JWT-authenticated profiles, an AI (GPT-4o) skill-extraction and job-matching engine, and Web3 wallet payments — MetaMask on Ethereum/Polygon and Phantom on Solana — gating job postings behind an on-chain platform fee.",
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Drizzle ORM",
      "OpenAI GPT-4o",
      "Web3 (MetaMask/Phantom)",
    ],
    categories: ["Full-Stack Engineering", "AI & Intelligent Systems"],
    roles: ["sde", "fullstack", "genai"],
    // Note: the GitHub Pages URL for this repo only serves the rendered README (no build
    // output was published there), so it isn't linked as a live demo.
    github: `${GH}/Talent-and-Freelance-Marketplace`,
    featured: true,
    year: 2025,
  },
  {
    id: "sales-analytics",
    emoji: "📊",
    title: "Enterprise Sales Analytics Platform",
    repo: "Enterprise-Sales-Analytics-Platfor",
    tagline: "End-to-end BI pipeline from raw data to executive KPIs",
    description:
      "A complete enterprise analytics pipeline over a 108,000-row synthetic retail dataset: Python ETL and data-quality validation, a PostgreSQL star schema, 30+ advanced SQL window-function queries, statistical and RFM customer segmentation, automated Excel financial workbooks, and a Power BI DAX measures library. Every KPI and insight is computed directly from the data, not fabricated.",
    tech: ["Python", "Pandas", "NumPy", "SciPy", "PostgreSQL", "SQL", "OpenPyXL", "Power BI / DAX", "Pytest"],
    categories: ["Data & Analytics"],
    roles: ["data", "sde"],
    github: `${GH}/Enterprise-Sales-Analytics-Platfor`,
    featured: true,
    year: 2026,
  },
  {
    id: "sap-fiori",
    emoji: "🏢",
    title: "SAP Fiori Facility Operations",
    repo: "sap-fiori-facility-ops",
    tagline: "Enterprise SAPUI5 + CAP work-order management system",
    description:
      "An end-to-end SAP Fiori/SAPUI5 + SAP CAP application covering the full facility work-order lifecycle — request, triage, approval, technician assignment, spare-parts consumption, and closure — built on OData V4 with Fiori Elements list/object pages, a backend state machine, an automated SLA engine, and 6 role-based views from Employee to Facility Manager. Production path ready for SAP BTP / HANA Cloud.",
    tech: ["SAPUI5", "SAP Fiori Elements", "SAP CAP", "Node.js", "OData V4", "CDS", "SQLite / SAP HANA"],
    categories: ["SAP & Enterprise Applications"],
    roles: ["sap", "sde"],
    github: `${GH}/sap-fiori-facility-ops`,
    featured: true,
    year: 2026,
  },
  {
    id: "lane-detection",
    emoji: "🚗",
    title: "Real-Time Lane Detection & ADAS",
    repo: "Real-Time-Lane-Detection-and-ADAS",
    tagline: "CNN-based lane detection with a driver-assistance dashboard",
    description:
      "A computer-vision ADAS pipeline built around a lightweight U-Net (7.8M parameters) trained on 12,764 road-scene images, reaching >90% accuracy/IoU at 15ms inference. Ships as a full 8-phase pipeline — from dataset analysis through real-time inference — plus a Flask web app with live camera input, image/video upload, and a 4-level driver-assistance alert dashboard.",
    tech: ["Python", "TensorFlow", "U-Net (CNN)", "OpenCV", "Flask"],
    categories: ["Computer Vision", "AI & Intelligent Systems"],
    roles: ["ai-ml", "cv"],
    github: `${GH}/Real-Time-Lane-Detection-and-ADAS`,
    featured: true,
    year: 2026,
  },
  {
    id: "pr-review-agent",
    emoji: "🔍",
    title: "AI Code Review Agent",
    repo: "Automated-Code-Review-Agent",
    tagline: "Multi-platform AI agent for pull-request reviews",
    description:
      "A modular Python agent that fetches PR diffs from GitHub, GitLab, or Bitbucket, analyzes changes for style issues, TODOs, and oversized functions, and generates human-readable feedback with a PR quality score through a CLI interface — built for the CodeMate hackathon.",
    tech: ["Python", "requests", "GitPython", "GitHub / GitLab / Bitbucket APIs"],
    categories: ["AI & Intelligent Systems", "Backend & APIs"],
    roles: ["ai-ml", "backend", "genai"],
    github: `${GH}/Automated-Code-Review-Agent`,
    featured: true,
    year: 2025,
  },

  // ---- more projects ----
  {
    id: "queue-api",
    emoji: "📬",
    title: "Queue Management API (queuectl)",
    repo: "Queue-Management-API",
    tagline: "CLI background job queue with retries & a Dead Letter Queue",
    description:
      "A minimal CLI-driven background job queue: parallel workers, exponential-backoff retries, a Dead Letter Queue for permanently failed jobs, per-job timeouts/priority/scheduling, SQLite persistence, per-job log files, and a small HTTP metrics endpoint.",
    tech: ["Python", "SQLite", "CLI", "multiprocessing"],
    categories: ["Backend & APIs"],
    roles: ["backend", "sde"],
    github: `${GH}/Queue-Management-API`,
    featured: false,
    year: 2025,
  },
  {
    id: "srmap-eventsphere",
    emoji: "🎉",
    title: "SRMAP EventSphere",
    repo: "SRMAP-EventSphere",
    tagline: "Full-stack university event management platform",
    description:
      "A full-stack event management platform for university campus events, with a React + shadcn/Radix UI, an Express + Drizzle ORM (PostgreSQL/Neon) backend, JWT authentication, and integrated Stripe / Razorpay payments for ticketed events.",
    tech: ["React", "TypeScript", "Express", "Drizzle ORM", "PostgreSQL (Neon)", "JWT", "Stripe", "Razorpay"],
    categories: ["Full-Stack Engineering"],
    roles: ["sde", "fullstack"],
    github: `${GH}/SRMAP-EventSphere`,
    featured: false,
    year: 2025,
  },
  {
    id: "mic-elms",
    emoji: "🗂️",
    title: "Enterprise Employee Leave Management System",
    repo: "MIC-Employee_Leave_Management_System",
    tagline: "Multi-level leave approval workflow (HOD → Admin)",
    description:
      "A full-stack employee leave management system for educational institutions, with a multi-level HOD-to-Admin approval workflow, JWT auth with role-based access control, document uploads, an analytics dashboard with Excel export, and a fully responsive UI.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT", "Swagger"],
    categories: ["Full-Stack Engineering", "SAP & Enterprise Applications"],
    roles: ["sde", "fullstack", "backend"],
    demo: "https://mic-employee-leave-management-syste-ebon.vercel.app/",
    github: `${GH}/MIC-Employee_Leave_Management_System`,
    image: withBase("images/projects/mic-elms.jpg"),
    featured: false,
    year: 2026,
  },
  {
    id: "weight-loss-optimizer",
    emoji: "🥗",
    title: "Personalized Weight Loss & Protein Optimization",
    repo: "Personalized-Weight-Loss-and-Protein-Intake-Optimization",
    tagline: "ML-driven personalized meal planning",
    description:
      "A full-stack diet optimization app that generates personalized meal plans from a custom Hierarchical Clustering + Multilayer Perceptron model: BMR/TDEE calculation, goal-based macro targets, an adherence-likelihood score, and data-driven food selection from a real nutrition database, behind JWT-authenticated FastAPI endpoints.",
    tech: ["React", "Vite", "FastAPI", "TensorFlow / Keras", "scikit-learn", "MongoDB Atlas", "JWT"],
    categories: ["AI & Intelligent Systems", "Full-Stack Engineering"],
    roles: ["ai-ml", "fullstack", "data"],
    demo: "https://weightloss-app-frontend.onrender.com/",
    github: `${GH}/Personalized-Weight-Loss-and-Protein-Intake-Optimization`,
    featured: false,
    year: 2026,
  },
  {
    id: "conversational-agent",
    emoji: "💬",
    title: "Cloud-Deployed Conversational Agent",
    repo: "Cloud-Deployed-Conversational-Agent",
    tagline: "Transformer chatbot optimized for cloud inference",
    description:
      "A DistilGPT2-based conversational agent optimized for production serving: exported to ONNX and INT8-quantized for CPU inference on Cloud Run, with a GPU deployment path via Vertex AI for sub-200ms latency at scale.",
    tech: ["Python", "Hugging Face Transformers", "DistilGPT2", "ONNX Runtime", "Docker", "Google Cloud Run", "Vertex AI"],
    categories: ["Cloud & GenAI", "AI & Intelligent Systems"],
    roles: ["ai-ml", "genai", "backend"],
    github: `${GH}/Cloud-Deployed-Conversational-Agent`,
    featured: false,
    year: 2025,
  },
  {
    id: "resume-analyzer",
    emoji: "📄",
    title: "Resume Intelligence Platform",
    repo: "AI-Powered-Resume-Analyzer",
    tagline: "AI resume analysis with a deterministic offline fallback",
    description:
      "A full-stack resume analyzer that extracts text from PDF/DOCX/TXT resumes and returns a structured AI analysis — summary, detected skills, gaps, suggestions, and a career path. Runs fully offline with a deterministic fallback analyzer, or with real OpenAI-powered analysis when a key is supplied.",
    tech: ["React", "Vite", "Material-UI", "Node.js", "Express", "Multer", "pdf-parse", "mammoth", "OpenAI (optional)"],
    categories: ["AI & Intelligent Systems", "Full-Stack Engineering"],
    roles: ["ai-ml", "fullstack", "genai"],
    // Note: the hosted demo is currently returning server errors (dead backend), so it isn't linked live.
    github: `${GH}/AI-Powered-Resume-Analyzer`,
    featured: false,
    year: 2025,
  },
  {
    id: "plagiarism-detector",
    emoji: "🔎",
    title: "NLP Document Similarity Engine",
    repo: "AI-Based-Plagiarism-Detection-Tool",
    tagline: "Text, PDF & GitHub-repo similarity detection",
    description:
      "A Flask web app that detects textual similarity across plain text, PDF, and GitHub repositories/code files, with an enhanced ML-based comparison mode and a difflib-based fallback when the enhanced models aren't available.",
    tech: ["Python", "Flask", "difflib", "PDF text extraction"],
    categories: ["AI & Intelligent Systems"],
    roles: ["ai-ml", "backend"],
    github: `${GH}/AI-Based-Plagiarism-Detection-Tool`,
    featured: false,
    year: 2025,
  },
  {
    id: "pdf-highlighter",
    emoji: "📈",
    title: "Maersk Financial Navigator",
    repo: "AI-Powered-PDF-Document-Highlighter",
    tagline: "In-browser PDF viewer with jump-to-reference & phrase highlighting",
    description:
      "A financial-document navigator built around a React PDF viewer: jump directly to key references (EBITDA, revenue, asset sales) in a real Maersk quarterly report, or type a phrase to locate and highlight every match in the document — built for a take-home assignment.",
    tech: ["React", "Vite"],
    categories: ["Computer Vision", "Full-Stack Engineering"],
    roles: ["cv", "fullstack"],
    demo: "https://cloud-motive-assignment-pdf-highlig.vercel.app",
    github: `${GH}/AI-Powered-PDF-Document-Highlighter`,
    image: withBase("images/projects/pdf-highlighter.jpg"),
    featured: false,
    year: 2025,
  },
  {
    id: "gst-billing",
    emoji: "🧾",
    title: "GST Billing & Inventory Management System",
    repo: "GST-Billing-and-Inventory-Management-System",
    tagline: "Java Spring Boot GST invoicing for wholesale trade",
    description:
      "A GST billing system for wholesale trade (sugar, atta, oil, rice): automatic CGST+SGST vs. IGST invoicing by state, live stock deduction, low-stock alerts, and GSTR-1/GSTR-3B-format report generation.",
    tech: ["Java", "Spring Boot", "React", "H2 Database"],
    categories: ["Backend & APIs"],
    roles: ["java", "backend"],
    github: `${GH}/GST-Billing-and-Inventory-Management-System`,
    featured: false,
    year: 2026,
  },
  {
    id: "feedback-platform",
    emoji: "📝",
    title: "Customer Feedback & Complaint Management Platform",
    repo: "Customer-Feedback-and-Complaint-Management-Platform",
    tagline: "Staff feedback platform with case lifecycle & analytics",
    description:
      "A staff feedback and complaint management platform (\"NeoConnect\") with a full case lifecycle (new → assigned → resolved/escalated with automatic 7-day escalation), role-based access for staff/secretariat/case-manager/admin, a public transparency hub, polling, and a department/category analytics dashboard.",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT"],
    categories: ["Full-Stack Engineering"],
    roles: ["sde", "fullstack"],
    demo: "https://aswartha-harshitha-neostats-project.vercel.app",
    github: `${GH}/Customer-Feedback-and-Complaint-Management-Platform`,
    featured: false,
    year: 2026,
  },
  {
    id: "gesture-game",
    emoji: "🎮",
    title: "Computer Vision Gesture-Controlled Game",
    repo: "finger-tracking-space-survival-game",
    tagline: "Webcam finger-tracking arcade game",
    description:
      "A browser arcade game piloted entirely by index-finger tracking via MediaPipe Hands — pooled object rendering for zero GC spikes, a velocity-adaptive smoothing filter for jitter-free tracking, and a fully procedural Web Audio soundtrack. Pure HTML5/CSS/JS, no build step required.",
    tech: ["JavaScript (ES Modules)", "MediaPipe Hands", "HTML5 Canvas", "Web Audio API"],
    categories: ["Computer Vision"],
    roles: ["cv"],
    demo: "https://fingertrackingspacesurvivalgame.netlify.app/",
    github: `${GH}/finger-tracking-space-survival-game`,
    image: withBase("images/projects/gesture-game.jpg"),
    featured: false,
    year: 2026,
  },
  {
    id: "blooms-taxonomy",
    emoji: "🎓",
    title: "Bloom's Taxonomy Level Manager",
    repo: "blooms-taxonomy-manager",
    tagline: "Java Swing OBE management desktop app",
    description:
      "A Java Swing desktop application for managing Bloom's Taxonomy levels as part of SRM University-AP's Outcome-Based Education implementation, with authenticated CRUD operations over a SQLite-backed dataset.",
    tech: ["Java", "Java Swing", "SQLite"],
    categories: ["Algorithms & Academic"],
    roles: ["java"],
    github: `${GH}/blooms-taxonomy-manager`,
    featured: false,
    year: 2025,
  },
  {
    id: "motogp",
    emoji: "🏍️",
    title: "MotoGP Lap Time Prediction",
    repo: "MotoGP-Lap-Time-Prediction",
    tagline: "Data-science notebook for the Kaggle Burnout 2025 challenge",
    description:
      "An exploratory data-science notebook predicting MotoGP lap times from race telemetry data, built for the Kaggle Burnout 2025 challenge.",
    tech: ["Python", "Jupyter Notebook", "Pandas"],
    categories: ["Data & Analytics"],
    roles: ["data", "ai-ml"],
    demo: "https://www.kaggle.com/code/sugreevuharshitha/motogp-analysis-notebook",
    github: `${GH}/MotoGP-Lap-Time-Prediction`,
    featured: false,
    year: 2025,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);

export const roleFilters: { id: Role | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "sde", label: "Software Engineering" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "backend", label: "Backend" },
  { id: "ai-ml", label: "AI / ML" },
  { id: "genai", label: "GenAI / Agents" },
  { id: "data", label: "Data & Analytics" },
  { id: "cv", label: "Computer Vision" },
  { id: "sap", label: "SAP / Enterprise" },
  { id: "java", label: "Java" },
];
