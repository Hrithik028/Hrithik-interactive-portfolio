import React from "react";
import { Code, Database, Cloud, Cpu, Server, ShieldCheck } from "lucide-react";
import styles from "../../styles/SkillsWindow.module.css";

const skillCategories = [
  {
    icon: Code,
    title: "Core Engineering",
    subtitle: "Software Engineering fundamentals and practical tooling",
    skills: [
      "Python",
      "JavaScript / TypeScript",
      "Java",
      "C++",
      "Git",
      "REST APIs",
      "Data Structures & Algorithms"
    ]
  },
  {
    icon: Database,
    title: "Data & Analytics",
    subtitle: "Querying, analysis, and decision support",
    skills: [
      "SQL",
      "PostgreSQL",
      "Pandas",
      "NumPy",
      "Data Visualisation",
      "Exploratory Data Analysis (EDA)",
      "Feature Engineering"
    ]
  },
  {
    icon: Cpu,
    title: "AI / Machine Learning",
    subtitle: "Model building, evaluation, and applied ML",
    skills: [
      "Scikit-learn",
      "PyTorch",
      "TensorFlow",
      "Transformers",
      "OpenCV",
      "Model Evaluation",
      "Hyperparameter Tuning"
    ]
  },
  {
    icon: Cloud,
    title: "Infrastructure & Dev Tools",
    subtitle: "Deployment-aware development and reproducibility",
    skills: [
      "Docker",
      "FastAPI",
      "Linux Basics",
      "CI/CD Basics",
      "MLflow (experiment tracking)",
      "AWS / Azure (foundations)"
    ]
  },
  {
    icon: Server,
    title: "IT Support & Operations",
    subtitle: "Support workflows and reliability mindset",
    skills: [
      "Incident Triage",
      "Troubleshooting & Root Cause Thinking",
      "Documentation & Handover",
      "Access / Login Issue Resolution",
      "Ticketing-style Workflow",
      "Customer Communication"
    ]
  },
  {
    icon: ShieldCheck,
    title: "Professional Practices",
    subtitle: "How you work in teams and deliver outcomes",
    skills: [
      "Stakeholder Communication",
      "Agile / Team Delivery",
      "Requirements Clarification",
      "Prioritisation Under Deadlines",
      "Structured Reporting"
    ]
  }
];

export default function SkillsWindow() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Technical Skills</h1>
        <p className={styles.subtitle}>
          Balanced across Data Analytics, Software Engineering, and IT Support.
        </p>
      </div>

      <div className={styles.grid} role="list" aria-label="Skill categories">
        {skillCategories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <section key={index} className={styles.card} role="listitem">
              <div className={styles.cardHeader}>
                <div className={styles.iconBox} aria-hidden="true">
                  <IconComponent className={styles.icon} />
                </div>

                <div className={styles.headerText}>
                  <h3 className={styles.cardTitle}>{category.title}</h3>
                  <p className={styles.cardSubtitle}>{category.subtitle}</p>
                </div>
              </div>

              <div className={styles.skillsWrap}>
                {category.skills.map((skill, i) => (
                  <span key={i} className={styles.skillPill}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}