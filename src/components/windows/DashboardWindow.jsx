import { ExternalLink, Github, FileText, Mail } from "lucide-react";
import styles from "../../styles/DashboardWindow.module.css";

export default function DashboardWindow({ onOpen }) {
    return (
        <div className={styles.container}>

            {/* Header */}
            <div className={styles.header}>
                <h1>Hrithik Jadhav</h1>
                <div className={styles.subtitle}>
                    AI & Data Engineer | Software Developer | IT Support
                </div>
                <div className={styles.status}>
                    Sydney, Australia · Open to Opportunities
                </div>
            </div>

            {/* Grid */}
            <div className={styles.grid}>

                {/* Featured Project */}
                <div className={styles.card}>
                    <h2>Featured Project</h2>
                    <strong>Multi-Agent LLM Code Translation System</strong>
                    <p>
                        Execution-verified Python → Java translation using planning,
                        AST analysis, and automated repair loops (UNSW Capstone).
                    </p>

                    <button
                        onClick={() => onOpen("projects")}
                        className={styles.linkButton}
                    >
                        View Project <ExternalLink size={14} />
                    </button>
                </div>

                {/* Skills */}
                <div className={styles.card}>
                    <h2>Core Stack</h2>

                    <div className={styles.skills}>
                        {["Python", "Java", "React", "SQL", "PyTorch", "Docker"].map(
                            (skill) => (
                                <span key={skill} className={styles.skillBadge}>
                                    {skill}
                                </span>
                            )
                        )}
                    </div>

                    <button
                        onClick={() => onOpen("skills")}
                        className={styles.linkButton}
                    >
                        View Full Skills
                    </button>
                </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
                <a
                    href="https://github.com/Hrithik028"
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles.primaryBtn} ${styles.github}`}
                >
                    <Github size={16} /> GitHub
                </a>

                <button
                    onClick={() => onOpen("resume")}
                    className={`${styles.primaryBtn} ${styles.resume}`}
                >
                    <FileText size={16} /> Resume
                </button>

                <button
                    onClick={() => onOpen("contact")}
                    className={`${styles.primaryBtn} ${styles.contact}`}
                >
                    <Mail size={16} /> Contact
                </button>
            </div>
        </div>
    );
}