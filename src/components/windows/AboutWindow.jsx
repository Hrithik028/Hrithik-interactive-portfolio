import { Calendar, GraduationCap, MapPin, Wrench } from "lucide-react";
import { ASSETS } from "../../config/assets";
import styles from "../../styles/AboutWindow.module.css";

export default function AboutWindow() {
  const interests = [
    "Data analytics: SQL, dashboards, reporting",
    "Software engineering: APIs, testing, Git, clean architecture",
    "AI/ML: evaluation, feature engineering, deployment mindset",
    "Automation: Python utilities and workflow improvements",
    "IT support: triage, troubleshooting, documentation",
    "Continuous improvement: process, quality, reliability"
  ];

  const strengths = [
    { label: "Data Analyst", value: "SQL, EDA, KPI reporting, stakeholder communication" },
    { label: "Software Engineer", value: "React, APIs, maintainable code, testing mindset" },
    { label: "AI Engineer", value: "ML pipelines, evaluation, iterative improvement, practical deployment" },
    { label: "IT Service Desk", value: "L1/L2 triage, clear documentation, customer-first support" }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src={ASSETS.images.profile}
          alt="Hrithik Jadhav"
          className={styles.profileImage}
        />

        <div className={styles.headerText}>
          <h1 className={styles.name}>Hrithik Jadhav</h1>
          <p className={styles.subtitle}>
            AI & Data Engineer | Software Developer | IT Support
          </p>
          <div className={styles.badges}>
            <span className={styles.badge}>Open to Opportunities</span>
            <span className={styles.badgeSecondary}>Sydney, Australia</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Snapshot</h2>

          <div className={styles.infoItem}>
            <MapPin className={styles.icon} />
            <span>Sydney, NSW, Australia</span>
          </div>

          <div className={styles.infoItem}>
            <GraduationCap className={styles.icon} />
            <span>University of New South Wales (UNSW Sydney)</span>
          </div>

          <div className={styles.infoItem}>
            <Calendar className={styles.icon} />
            <span>Graduated 2026</span>
          </div>
        </div>

        <div className={styles.block}>
          <h2 className={styles.sectionTitle}>About Me</h2>

          <p className={styles.paragraph}>
            I am a Master of IT candidate focused on building practical systems across AI, data,
            and software engineering. I like work where messy requirements become reliable tools:
            dashboards, APIs, automation, evaluation loops, and user-facing applications.
          </p>

          <p className={styles.paragraph}>
            My strongest projects sit at the intersection of engineering and analysis: multi-agent
            LLM workflows, climate prediction, geospatial analytics, and API-driven automation.
            I care about clear documentation, reproducible work, and systems that are easy for
            other people to understand and operate.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.sectionTitleNoMargin}>What I Bring</h2>
            <div className={styles.cardHeaderRight}>
              <Wrench className={styles.iconSmall} />
              <span className={styles.cardHint}>Build + analysis + support</span>
            </div>
          </div>

          <div className={styles.strengthGrid}>
            {strengths.map((s) => (
              <div key={s.label} className={styles.strengthItem}>
                <div className={styles.strengthTitle}>{s.label}</div>
                <div className={styles.strengthValue}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.block}>
          <h2 className={styles.sectionTitle}>Interests</h2>

          <div className={styles.tags}>
            {interests.map((interest) => (
              <span key={interest} className={styles.tag}>
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
