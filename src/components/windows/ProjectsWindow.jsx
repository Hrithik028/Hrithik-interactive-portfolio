import React from "react";
import { ExternalLink, Github } from "lucide-react";
import styles from "../../styles/ProjectsWindow.module.css";

const projects = [
  {
    title: "Large Language Model Code Translation",
    description:
      "Multi-agent LLM system for reliable Python ↔ Java code translation with execution-based verification (UNSW COMP9900 Capstone). Implements planning, translation, and automated testing/repair loops.",
    techStack: ["Python", "LLMs", "Docker", "AST Parsing"],
    type: "AI Systems",
    github: "https://github.com/Hrithik028/Large-Language-Model-Code-Translation"
  },
  {
    title: "Amazon Climate Hot Event Prediction",
    description:
      "End-to-end machine learning pipeline predicting extreme heat events and monthly temperatures in the Amazon region using climate indices and neural network models with temporal generalisation evaluation.",
    techStack: ["Python", "Neural Networks", "Time Series", "Jupyter"],
    type: "Machine Learning",
    github: "https://github.com/Hrithik028/amazon-climate-hot-event-prediction"
  },
  {
    title: "Airbnb Visual Analytics (Sydney)",
    description:
      "Reproducible visual analytics pipeline analysing Airbnb pricing, demand, and spatial patterns in Sydney using Python and geospatial data.",
    techStack: ["Python", "Pandas", "Geospatial Analysis", "Data Visualisation"],
    type: "Data Analytics",
    github: "https://github.com/Hrithik028/Airbnb-Visual-Analytics"
  },
  {
    title: "NBA Discord Bot",
    description:
      "Discord bot integrating official NBA endpoints and live scoreboard data to provide real-time scores, schedules, and player statistics.",
    techStack: ["Python", "Discord API", "REST APIs"],
    type: "Backend / API",
    github: "https://github.com/Hrithik028/NBA-discord-bot"
  }
];

export default function ProjectsWindow() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>GitHub Projects</h1>
      </div>

      <div className={styles.projectList}>
        {projects.map((project, index) => (
          <div key={index} className={styles.projectCard}>
            <div className={styles.cardHeader}>
              <div className={styles.leftSection}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <span className={styles.typeBadge}>{project.type}</span>
              </div>
            </div>

            <p className={styles.description}>{project.description}</p>

            <div className={styles.techStack}>
              {project.techStack.map((tech, i) => (
                <span key={i} className={styles.techTag}>
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