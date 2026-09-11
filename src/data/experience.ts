// Straight from the resume — exact roles, dates, and bullet points, nothing
// embellished.
export interface ExperienceEntry {
  role: string;
  organization: string;
  location: string;
  /** Empty string when the source doesn't give a specific date range. */
  period: string;
  summary: string;
  bullets: string[];
  /** A distinct named project called out within this role, each with its own bullets. */
  subProjects?: { name: string; bullets: string[] }[];
  tech: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Full Stack Developer Intern",
    organization: "DVR and Dr. HS MIC College of Technology",
    location: "Vijayawada, Andhra Pradesh",
    period: "January 2026 – March 2026",
    summary:
      "Contributed to the development of an Employee Leave Management System designed to digitize and streamline the leave-management process within an educational organization, built on the MERN stack with role-based access and structured backend APIs.",
    bullets: [
      "Developed a full-stack Employee Leave Management System using React.js, Node.js, Express.js, and MongoDB.",
      "Implemented role-based access control for different users involved in the leave approval workflow.",
      "Designed and developed responsive frontend interfaces for employee and administrative workflows.",
      "Developed RESTful APIs for employee management, leave applications, approvals, and database operations.",
      "Integrated MongoDB for storing and managing employee, leave, and workflow-related data.",
      "Tested API endpoints and application workflows to ensure reliable communication between the frontend and backend.",
      "Worked on a structured approval workflow to make the leave-request process more organized and efficient.",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "JavaScript"],
  },
  {
    role: "AI/ML Intern",
    organization: "Edunet Foundation (APSSDC)",
    location: "Vijayawada, Andhra Pradesh",
    period: "May 2025 – July 2025",
    summary:
      "Focused on Python-based machine learning solutions and Markov Decision Process (MDP) models for AI-driven decision-making, working with data processing and numerical computing.",
    bullets: [
      "Implemented Python-based machine learning solutions for AI-driven decision-making.",
      "Worked with Markov Decision Process (MDP) models to understand and implement decision-making systems.",
      "Performed data processing and numerical operations using Python and NumPy.",
      "Applied fundamental machine learning concepts to practical AI problem-solving scenarios.",
      "Worked with structured data as part of model development and experimentation.",
      "Developed an understanding of AI decision systems, machine learning workflows, and model implementation.",
    ],
    tech: ["Python", "Machine Learning", "NumPy", "Markov Decision Processes (MDP)"],
  },
  {
    role: "Data Science and Machine Learning Intern",
    organization: "YBI Foundation",
    location: "Remote",
    period: "January 2026 – March 2026",
    summary:
      "Worked on Python-based data science and machine learning projects involving data analysis, predictive modeling, and model evaluation.",
    bullets: [
      "Performed data preprocessing and EDA using Pandas and NumPy.",
      "Built and evaluated classification and regression models using Scikit-learn.",
      "Developed a Heart Disease Prediction model using patient health data.",
      "Worked on an AI-based Weight Loss & Nutrition Recommendation System using clustering and neural networks.",
    ],
    tech: ["Python", "Machine Learning", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Keras"],
  },
];
