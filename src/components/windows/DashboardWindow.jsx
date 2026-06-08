import {
    CheckCircle2,
    ExternalLink,
    FileText,
    Github,
    Mail
} from "lucide-react";
import styles from "../../styles/DashboardWindow.module.css";

export default function DashboardWindow({ onOpen }) {
    const roleFit = [
        "Software development, data analytics, cloud APIs, and AI systems",
        "Python, SQL, AWS S3/Athena, Docker, REST APIs, Power BI, and Git",
        "Comfortable across build, analysis, documentation, support, and stakeholder communication"
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Hrithik Jadhav</h1>
                <div className={styles.subtitle}>
                    AI & Data Engineer | Software Developer | IT Support
                </div>
                <div className={styles.status}>
                    Sydney, Australia - Open to Opportunities
                </div>
            </div>

            <div className={styles.summary}>
                <div>
                    <h2>Quick Signal</h2>
                    <p>
                        UNSW Master of IT graduate building useful software, data, cloud, and AI-enabled systems with
                        a practical delivery mindset.
                    </p>
                </div>
                <div className={styles.signalGrid}>
                    <div><strong>4</strong><span>featured projects</span></div>
                    <div><strong>2026</strong><span>completed MIT</span></div>
                    <div><strong>AWS</strong><span>analytics pipeline</span></div>
                </div>
            </div>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <h2>Featured Project</h2>
                    <strong>AWS Job Market Skills Analytics Pipeline</strong>
                    <p>
                        Python ETL pipeline using S3, Athena, SQL, and jobs API data to analyse
                        Australian tech skill demand across software, data, cloud, and support roles.
                    </p>

                    <button
                        onClick={() => onOpen("projects")}
                        className={styles.linkButton}
                    >
                        View Project <ExternalLink size={14} />
                    </button>
                </div>

                <div className={styles.card}>
                    <h2>Role Fit</h2>
                    <div className={styles.fitList}>
                        {roleFit.map((item) => (
                            <div key={item} className={styles.fitItem}>
                                <CheckCircle2 size={15} />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.skills}>
                        {["Python", "Java", "React", "SQL", "PyTorch", "Docker"].map((skill) => (
                            <span key={skill} className={styles.skillBadge}>
                                {skill}
                            </span>
                        ))}
                    </div>

                    <button
                        onClick={() => onOpen("skills")}
                        className={styles.linkButton}
                    >
                        View Full Skills
                    </button>
                </div>
            </div>

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
