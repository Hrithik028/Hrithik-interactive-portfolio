import { ExternalLink, Github } from "lucide-react";
import styles from "../../styles/ProjectsWindow.module.css";

const projects = [
  {
    title: "AWS Job Market Skills Analytics Pipeline",
    period: "May 2026 - Jun 2026",
    description:
      "End-to-end analytics pipeline collecting, cleaning, storing, and analysing Australian tech job listings across software, data, cloud, IT support, and AWS roles.",
    impact:
      "Stored raw and processed datasets in Amazon S3, queried demand patterns with AWS Athena/SQL, and produced charts plus recruiter-friendly GitHub documentation.",
    techStack: ["Python", "Pandas", "Boto3", "Amazon S3", "AWS Athena", "SQL", "Adzuna API"],
    type: "Cloud Data Analytics",
    github: "https://github.com/Hrithik028"
  },
  {
    title: "Public Transport API & Data Processing System",
    period: "Nov 2025 - Dec 2025",
    description:
      "Python and Flask REST API system for processing and serving real-world public transport data across routes, stops, and trips.",
    impact:
      "Implemented validation, pagination, fuzzy search, structured SQL workflows, and modular backend documentation for maintainable delivery.",
    techStack: ["Python", "Flask-RESTX", "SQLite", "Pandas", "REST APIs", "RapidFuzz"],
    type: "Backend / API",
    github: "https://github.com/Hrithik028"
  },
  {
    title: "Multi-Agent Code Translation System",
    period: "Sept 2025 - Dec 2025",
    description:
      "Multi-agent software system automating code translation workflows across planning, translation, validation, and review stages.",
    impact:
      "Built modular backend pipelines, integrated LLM APIs, and developed evaluation workflows to measure translation quality and functional correctness.",
    techStack: ["Python", "Docker", "AST Parsing", "OpenAI APIs", "Streamlit", "Git"],
    type: "AI Systems",
    github: "https://github.com/Hrithik028/Large-Language-Model-Code-Translation"
  },
  {
    title: "Airbnb Market Analysis & Geospatial Data Visualisation",
    period: "Dec 2025 - Jan 2026",
    description:
      "Sydney Airbnb listing analysis identifying pricing patterns, suburb-level demand trends, room-type differences, and availability patterns.",
    impact:
      "Cleaned and validated listing datasets, then created visualisations for non-technical audiences using statistical and geographic analysis.",
    techStack: ["Python", "Pandas", "GeoPandas", "Matplotlib"],
    type: "Data Visualisation",
    github: "https://github.com/Hrithik028/Airbnb-Visual-Analytics"
  }
];

export default function ProjectsWindow() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>GitHub Projects</h1>
          <p className={styles.subtitle}>Resume-backed project evidence across cloud, APIs, AI systems, and analytics.</p>
        </div>
      </div>

      <div className={styles.projectList}>
        {projects.map((project) => (
          <div key={project.title} className={styles.projectCard}>
            <div className={styles.cardHeader}>
              <div className={styles.leftSection}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <div className={styles.projectMeta}>
                  <span className={styles.typeBadge}>{project.type}</span>
                  <span>{project.period}</span>
                </div>
              </div>
            </div>

            <p className={styles.description}>{project.description}</p>
            <p className={styles.impact}>{project.impact}</p>

            <div className={styles.techStack}>
              {project.techStack.map((tech) => (
                <span key={tech} className={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>

            <div className={styles.actions}>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className={styles.actionLink}
              >
                <Github size={14} />
                View Code
              </a>

              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className={styles.actionSecondary}
              >
                <ExternalLink size={14} />
                Repository
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
