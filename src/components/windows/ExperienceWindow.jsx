import React from "react";
import { Calendar, MapPin, Building, Award, ExternalLink } from "lucide-react";

import saiepBadge from "../../assets/certifications/SAIEP-badge.png";
import saiepCert from "../../assets/certifications/SAIEP-certificate.pdf";

import styles from "../../styles/ExperienceWindow.module.css";

const experiences = [
  {
    role: "Senior Customer Service Associate",
    company: "Sushi Train",
    location: "Surry Hills, NSW",
    period: "Dec 2024 – Present",
    type: "Operations & Support",
    description:
      "Operate in a high-volume service environment, managing issue triage, incident resolution, and handovers while maintaining operational continuity.",
    achievements: [
      "Act as first-line support, triaging high-volume requests and resolving the majority of issues within defined service expectations.",
      "Diagnose problems under time constraints, prioritising critical incidents and escalating complex cases appropriately.",
      "Maintain structured records of issues and resolutions to ensure accurate handovers and consistent service delivery.",
      "Optimised team coordination workflows to reduce service delays during peak operational periods."
    ]
  },
  {
    role: "Student Consultant – Industry Project (SAIEP)",
    company:
      "UNSW – Student as Industry Engagement Program (Client: Killara Initiatives)",
    location: "Sydney, Australia",
    period: "Jun 2024 (2-week engagement)",
    type: "Industry Project",
    description:
      "Delivered a client-facing industry report analysing a real-world business challenge using structured research, analysis, and recommendation development.",
    achievements: [
      "Conducted structured secondary research and competitor analysis to diagnose core operational and strategic challenges.",
      "Synthesised research findings into evidence-based recommendations aligned with measurable business outcomes.",
      "Collaborated in an agile-style team environment, tracking deliverables and meeting strict project deadlines.",
      "Presented an implementation roadmap including prioritisation, risks/constraints, and execution timeline."
    ],
    evidence: [
      {
        title: "SAIEP Digital Badge",
        type: "badge",
        file: saiepBadge,
        thumbnail: saiepBadge
      },
      {
        title: "SAIEP Completion Certificate (PDF)",
        type: "certificate",
        file: saiepCert
      }
    ]
  }
];

function typeVariant(type) {
  const t = String(type || "").toLowerCase();
  if (t.includes("industry")) return styles.badgeGreen;
  if (t.includes("support") || t.includes("operations")) return styles.badgeBlue;
  return styles.badgePurple;
}

function EvidenceIcon({ kind }) {
  const k = String(kind || "").toLowerCase();
  if (k.includes("badge"))
    return <Award className={styles.expEvidenceIcon} aria-hidden="true" />;
  return <ExternalLink className={styles.expEvidenceIcon} aria-hidden="true" />;
}

export default function ExperienceWindow() {
  return (
    <div className={styles.expWindow}>
      <div className={styles.expHeader}>
        <h1 className={styles.expTitle}>Professional Experience</h1>
      </div>

      <div className={styles.expList} role="list" aria-label="Experience list">
        {experiences.map((exp, index) => (
          <article key={index} className={styles.expCard} role="listitem">
            <div className={styles.expTopRow}>
              <div className={styles.expTopLeft}>
                <h3 className={styles.expRole}>{exp.role}</h3>
                <div className={styles.expCompanyRow}>
                  <Building className={styles.expIcon} aria-hidden="true" />
                  <span className={styles.expCompany}>{exp.company}</span>
                </div>
              </div>

              {/* ✅ combine base badge + variant */}
              <span className={`${styles.badge} ${typeVariant(exp.type)}`}>
                {exp.type}
              </span>
            </div>

            <div className={styles.expMeta}>
              <div className={styles.expMetaItem}>
                <Calendar className={styles.expMetaIcon} aria-hidden="true" />
                <span>{exp.period}</span>
              </div>

              <div className={styles.expMetaItem}>
                <MapPin className={styles.expMetaIcon} aria-hidden="true" />
                <span>{exp.location}</span>
              </div>
            </div>

            <p className={styles.expDescription}>{exp.description}</p>

            <div className={styles.expAchievements}>
              <h5 className={styles.expAchievementsTitle}>Key Achievements</h5>
              <ul className={styles.expAchievementsList}>
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className={styles.expAchievementItem}>
                    <span className={styles.expBullet} aria-hidden="true" />
                    <span className={styles.expAchievementText}>
                      {achievement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {exp.evidence?.length ? (
              <div className={styles.expEvidence}>
                <h5 className={styles.expEvidenceTitle}>Credentials</h5>
                <div className={styles.expEvidenceRow}>
                  {exp.evidence.map((item, i) => (
                    <a
                      key={i}
                      href={item.file}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.expEvidenceCard}
                      title={item.title}
                      aria-label={`Open ${item.title}`}
                    >
                      {item.thumbnail ? (
                        <img
                          className={styles.expEvidenceThumb}
                          src={item.thumbnail}
                          alt={item.title}
                          loading="lazy"
                        />
                      ) : (
                        <div className={styles.expEvidenceFile}>
                          <EvidenceIcon kind={item.type} />
                        </div>
                      )}

                      <div className={styles.expEvidenceText}>
                        <div className={styles.expEvidenceName}>
                          {item.title}
                        </div>
                        <div className={styles.expEvidenceMeta}>Open</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}