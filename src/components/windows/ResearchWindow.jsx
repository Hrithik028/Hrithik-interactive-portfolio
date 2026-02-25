// import React from "react";
import { Microscope, Cpu, FileText, Server, Wrench, BarChart3 } from "lucide-react";
import styles from "../../styles/ResearchWindow.module.css";

const researchAreas = [
  {
    icon: Cpu,
    title: "Reinforcement Learning & Autonomous Decision-Making",
    description:
      "Interest in reinforcement learning for sequential decision-making, with emphasis on practical reward design, training stability, and evaluation in simulated environments."
  },
  {
    icon: Microscope,
    title: "Computer Vision & Applied Perception",
    description:
      "Applied computer vision for detection and analysis, focusing on building reliable pipelines and evaluating performance trade-offs for real-world use cases."
  },
  {
    icon: BarChart3,
    title: "Data Analytics & Decision Support",
    description:
      "Interest in turning messy data into actionable insights through reproducible analysis, feature engineering, and clear reporting for stakeholder decision-making."
  },
  {
    icon: Wrench,
    title: "IT Operations & Service Reliability",
    description:
      "Interest in incident management, operational troubleshooting, and documentation practices that improve system uptime, service continuity, and support quality."
  },
  {
    icon: Server,
    title: "Distributed Systems & Systems Security",
    description:
      "Interest in reliability, scalability, failure modes, and security concerns in distributed systems, including how design choices impact performance and risk."
  }
];

const publications = [
  {
    title: "A Compendium on Distributed Systems",
    authors:
      "Aneesh Khole, Atharva Thakar, Avadhoot Kulkarni, Hrithik Jadhav, Shreyas Shende, Varad Karajkhede",
    venue: "Research Paper",
    year: "—",
    status: "Available",
    links: [
      { label: "View PDF", href: "https://doi.org/10.48550/arXiv.2302.03990" }
    ],
    abstract:
      "Computer systems have evolved from sizable single-user machines to multi-user networked systems, enabling the distributed systems paradigm. A distributed system is regarded as software consisting of a collection of dependent network communication and computational nodes. This paradigm yields high performance and efficiency through decentralization across interconnected nodes. This paper defines key issues, challenges and security concerns in distributed systems and examines solutions developed over the years to address them, including brief coverage of components and working principles."
  }
];

function statusClass(status) {
  const s = String(status || "").toLowerCase();
  if (s.includes("published")) return styles.statusGreen;
  if (s.includes("available")) return styles.statusBlue;
  if (s.includes("review") || s.includes("submitted")) return styles.statusYellow;
  return styles.statusGray;
}

export default function ResearchWindow() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Research & Interests</h1>
        <p className={styles.subtitle}>
          Focus areas aligned to data analytics, software engineering, and IT support while continuing to explore AI/ML systems.
        </p>
      </div>

      <div className={styles.scrollArea}>
        {/* Research Areas */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Research Interests</h2>
          <div className={styles.grid}>
            {researchAreas.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <div key={index} className={styles.areaCard}>
                  <div className={styles.areaHeader}>
                    <div className={styles.iconBox}>
                      <IconComponent className={styles.icon} aria-hidden="true" />
                    </div>
                    <h3 className={styles.areaTitle}>{area.title}</h3>
                  </div>
                  <p className={styles.areaDescription}>{area.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Publications */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Publications & Papers</h2>

          <div className={styles.pubList}>
            {publications.map((pub, index) => (
              <article key={index} className={styles.pubCard}>
                <div className={styles.pubTopRow}>
                  <h4 className={styles.pubTitle}>{pub.title}</h4>

                  <span className={`${styles.statusBadge} ${statusClass(pub.status)}`}>
                    {pub.status}
                  </span>
                </div>

                {pub.authors && pub.authors !== "—" ? (
                  <p className={styles.pubAuthors}>{pub.authors}</p>
                ) : null}

                <div className={styles.pubMeta}>
                  <div className={styles.pubMetaItem}>
                    <FileText className={styles.metaIcon} aria-hidden="true" />
                    <span>{pub.venue}</span>
                  </div>

                  {pub.year && pub.year !== "—" ? (
                    <>
                      <span className={styles.dot} aria-hidden="true" />
                      <span className={styles.pubYear}>{pub.year}</span>
                    </>
                  ) : null}
                </div>

                {pub.abstract ? <p className={styles.pubAbstract}>{pub.abstract}</p> : null}

                {pub.links?.length ? (
                  <div className={styles.pubLinks}>
                    {pub.links.map((l, i) => (
                      <a
                        key={i}
                        className={styles.link}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}