import { withBase } from "../lib/utils";

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url: string;
  emoji: string;
}

export const certifications: Certification[] = [
  {
    id: "sap-fiori-dev",
    title: "SAP Certified — SAP Fiori Application Developer",
    issuer: "SAP",
    date: "Credly",
    url: "https://www.credly.com/badges/4ede0400-dfbb-4c97-b64c-44367e822bcf/public_url",
    emoji: "🏢",
  },
  {
    id: "aws-saa",
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    date: "Credly",
    url: "https://www.credly.com/badges/ded2b295-111a-4c19-84da-0d83fc3f276e/public_url",
    emoji: "☁️",
  },
  {
    id: "genai-chatgpt",
    title: "Mastering Generative AI and ChatGPT",
    issuer: "GeeksforGeeks",
    date: "5-week course",
    url: "https://media.geeksforgeeks.org/courses/certificates/ec7ab37bbbb503f140a906e2ddbaa16c.pdf",
    emoji: "🤖",
  },
  {
    id: "oracle-oci-ai",
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle University",
    date: "July 2025",
    url: withBase("certificates/oracle-oci-ai-foundations-associate.pdf"),
    emoji: "🧠",
  },
  {
    id: "nptel-python",
    title: "The Joy of Computing Using Python",
    issuer: "NPTEL / IIT Madras",
    date: "Jul–Oct 2023 · 12-week course",
    url: "https://archive.nptel.ac.in/content/noc/NOC23/SEM2/Ecertificates/106/noc23-cs108/Course/NPTEL23CS108S4498334820112127.pdf",
    emoji: "🐍",
  },
];
