import React from "react";
import { Download, Eye, FileText, Copy } from "lucide-react";
import styles from "../../styles/ResumeWindow.module.css";

import resumePdf from "../../assets/resume/Hrithik_Jadhav_Resume.pdf";

export default function ResumeWindow() {
  const handleCopy = async () => {
    const text =
      `Hrithik Jadhav — Master of IT (AI)\n` +
      `Sydney, Australia\n` +
      `Focus: Data Analyst | Software Engineer | IT Support\n\n` +
      `Highlights:\n` +
      `• Built AI/ML + analytics projects (time-series climate prediction, Airbnb visual analytics)\n` +
      `• Developed an LLM-based code translation system (multi-agent, execution-verified)\n` +
      `• Built an API-integrated NBA Discord bot (backend + real-time data)\n`;

    try {
      await navigator.clipboard.writeText(text);
      // optional: you can add a toast later
    } catch (e) {
      // ignore silently
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Resume</h1>
        <p className={styles.subtitle}>
          One-click preview + download.
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.iconBox} aria-hidden="true">
          <FileText className={styles.icon} />
        </div>

        <div className={styles.main}>
          <div className={styles.name}>Hrithik Jadhav — Resume</div>
          <div className={styles.meta}>
            Master of IT (AI) · Data Analyst · Software Engineer · IT Support
          </div>

          <div className={styles.actions}>
            <a
              className={styles.primaryBtn}
              href={resumePdf}
              target="_blank"
              rel="noreferrer"
            >
              <Eye size={16} />
              Preview
            </a>

            <a className={styles.secondaryBtn} href={resumePdf} download>
              <Download size={16} />
              Download PDF
            </a>
          </div>


        </div>
      </div>

      <div className={styles.highlights}>
        <h2 className={styles.sectionTitle}>Fast Highlights</h2>
        <ul className={styles.list}>
          <li>
            <span className={styles.bullet} aria-hidden="true" />
            ML + analytics projects on GitHub (climate time-series, Airbnb analytics)
          </li>
          <li>
            <span className={styles.bullet} aria-hidden="true" />
            LLM code translation system (multi-agent + execution verification)
          </li>
          <li>
            <span className={styles.bullet} aria-hidden="true" />
            Backend/API project (NBA Discord bot)
          </li>
        </ul>
      </div>
    </div>
  );
}