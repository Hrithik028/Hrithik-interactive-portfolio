import { Award, Building, Calendar, ExternalLink, MapPin } from "lucide-react";

import saiepBadge from "../../assets/certifications/SAIEP-badge.png";
import saiepCert from "../../assets/certifications/SAIEP-certificate.pdf";

import styles from "../../styles/ExperienceWindow.module.css";

const experiences = [
  {
    role: "Research Assistant (Research Project)",
    company: "UNSW Capstone Project",
    location: "NSW, Australia",
    period: "Sept 2025 - Dec 2025",
    type: "AI Systems",
    description:
      "Designed and developed an AI-enabled multi-agent system to automate code translation workflows across planning, translation, review, and validation stages.",
    achievements: [
      "Built modular backend pipelines to coordinate agent communication, manage workflow state, and support reliable iterative development cycles.",
      "Integrated LLM APIs with structured testing and evaluation workflows to assess translation quality, functional correctness, and output consistency.",
      "Applied modular design, debugging, and workflow optimisation principles to improve maintainability, performance, and overall system reliability."
    ]
  },
  {
    role: "Operations & Customer Support Associate",
    company: "Sushi Train",
    location: "Surry Hills, NSW",
    period: "Dec 2024 - Present",
    type: "Operations & Support",
    description:
      "Manage high-volume customer and operational requests while maintaining accuracy, service quality, and smooth team coordination.",
    achievements: [
      "Prioritise urgent issues, resolve problems quickly, and escalate complex matters when needed.",
      "Maintain clear handover notes and operational records to support continuity across busy service periods.",
      "Identify small workflow issues during peak periods and help improve day-to-day efficiency."
    ]
  },
  {
    role: "Strategy Analyst (Project Experience)",
    company: "SAIEP - Student as Industry Engagement Program",
    location: "NSW, Australia",
    period: "Jun 2024 - Jul 2024",
    type: "Industry Project",
    description:
      "Coordinated project-related requests across team members and stakeholders, clarifying requirements and tracking progress to support organised delivery.",
    achievements: [
      "Maintained structured documentation, updates, and issue records to improve visibility, handovers, and information accuracy.",
      "Identified process issues early, escalated blockers when required, and followed up on actions to support timely resolution.",
      "Supported operational improvement by troubleshooting basic access/application issues and keeping information organised and easy to use."
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
  if (t.includes("ai")) return styles.badgePurple;
  return styles.badgeNeutral;
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
        <div>
          <h1 className={styles.expTitle}>Professional Experience</h1>
          <p className={styles.expSubtitle}>Resume-backed roles across AI systems, support, and industry project delivery.</p>
        </div>
      </div>

      <div className={styles.expList} role="list" aria-label="Experience list">
        {experiences.map((exp) => (
          <article key={`${exp.role}-${exp.period}`} className={styles.expCard} role="listitem">
            <div className={styles.expTopRow}>
              <div className={styles.expTopLeft}>
                <h3 className={styles.expRole}>{exp.role}</h3>
                <div className={styles.expCompanyRow}>
                  <Building className={styles.expIcon} aria-hidden="true" />
                  <span className={styles.expCompany}>{exp.company}</span>
                </div>
              </div>

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
                {exp.achievements.map((achievement) => (
                  <li key={achievement} className={styles.expAchievementItem}>
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
                  {exp.evidence.map((item) => (
                    <a
                      key={item.title}
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
