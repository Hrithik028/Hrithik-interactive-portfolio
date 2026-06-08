import { Download, Eye, FileText } from "lucide-react";
import styles from "../../styles/ResumeWindow.module.css";
import { ASSETS } from "../../config/assets";

const resumePdf = ASSETS.docs.resume;

export default function ResumeWindow() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Resume</h1>
        <p className={styles.subtitle}>
          One-click preview and download for recruiters.
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.iconBox} aria-hidden="true">
          <FileText className={styles.icon} />
        </div>

        <div className={styles.main}>
          <div className={styles.name}>Hrithik Jadhav - Resume</div>
          <div className={styles.meta}>
            Software Development | Data Analytics | Cloud & APIs | AI Systems
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
            AWS job market analytics pipeline using Python, S3, Athena, SQL, and jobs API data.
          </li>
          <li>
            <span className={styles.bullet} aria-hidden="true" />
            Public transport REST API with Flask-RESTX, SQLite, validation, pagination, and fuzzy search.
          </li>
          <li>
            <span className={styles.bullet} aria-hidden="true" />
            Multi-agent code translation system with LLM APIs, Docker, evaluation, and workflow automation.
          </li>
        </ul>
      </div>
    </div>
  );
}
