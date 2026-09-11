export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  location: string;
  date: string;
  doi: string;
  url: string;
  abstract: string;
}

export const publications: Publication[] = [
  {
    id: "protein-intake-weight-loss",
    title: "A Hybrid Machine Learning Framework for Personalized Weight Loss through Protein Intake Pattern Analysis",
    authors: "S Aswartha Harshitha",
    venue: "2026 IEEE International Conference on Emerging Computing and Intelligent Technologies (ICoECIT)",
    location: "Hyderabad, India",
    date: "January 2026",
    doi: "10.1109/ICoECIT68303.2026.11497296",
    url: "https://ieeexplore.ieee.org/document/11497296",
    abstract:
      "A data-driven framework for personalized weight management that analyzes protein intake patterns using machine learning and deep learning — combining a Target Encoding Wavelet Transform Filter for pre-processing, Random Forest GANs and Preference-Aware Inverse Optimization for adaptive diet plans, and Hierarchical Clustering with a Multi-Layer Perceptron to predict optimal protein intake, sustaining 95% predictive accuracy across iterative testing.",
  },
];
