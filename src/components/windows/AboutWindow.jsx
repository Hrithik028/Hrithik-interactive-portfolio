import { MapPin, GraduationCap, Calendar, Wrench } from "lucide-react";
import styles from "../../styles/AboutWindow.module.css";
import profilePhoto from "../../assets/profile_pic1.jpg"; // <-- put your photo here

export default function AboutWindow() {
  const interests = [
    "Data Analytics (SQL, dashboards, reporting)",
    "Software Engineering (APIs, testing, Git, clean architecture)",
    "AI / Machine Learning (evaluation, feature engineering, deployment mindset)",
    "Automation & Scripting (Python utilities, workflow improvements)",
    "IT Support / Service Desk (triage, troubleshooting, documentation, escalation)",
    "Continuous Improvement (process, quality, reliability)",
  ];

  const strengths = [
    { label: "Data Analyst", value: "SQL • EDA • KPI reporting • stakeholder communication" },
    { label: "Software Engineer", value: "React • APIs • maintainable code • testing mindset" },
    { label: "AI Engineer", value: "ML pipelines • evaluation • iterative improvement • practical deployment" },
    { label: "IT Service Desk", value: "L1/L2 triage • clear documentation • customer-first support" },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <img
          src={profilePhoto}
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
            <span className={styles.badgeSecondary}>Sydney • Australia</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className={styles.content}>
        {/* Personal Info */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Personal Information</h2>

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
            <span>Expected Graduation: 2026</span>
          </div>
        </div>

        {/* Summary */}
        <div className={styles.block}>
          <h2 className={styles.sectionTitle}>About Me</h2>

          <p className={styles.paragraph}>
            I’m a Master of IT graduate with a strong interest in building intelligent, reliable systems that
            bridge data, software, and real-world impact. My journey has been shaped by hands-on experience
            across analytics, application development, and applied AI where I’ve learned to move from
            understanding messy requirements to delivering structured, maintainable solutions.
          </p>

          <p className={styles.paragraph}>
            Throughout my academic and professional journey, I've developed a solid foundation in machine
            learning, deep learning, and data engineering. I'm particularly interested in reinforcement
            learning, computer vision, and multi-agent systems areas where intelligence meets system design
            and performance. I enjoy thinking about not just how models work, but how they integrate into
            scalable software systems.
          </p>

          <p className={styles.paragraph}>
            I approach problems with both a builder’s mindset and a support-oriented perspective. Whether
            analysing data for insights, engineering software features, improving model performance, or
            troubleshooting technical issues, I focus on clarity, reliability, and effective communication.
            I thrive in collaborative environments where I can apply cutting-edge AI techniques to solve
            real-world problems and create meaningful impact through technology.
          </p>
        </div>

        {/* Strengths Grid */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.sectionTitleNoMargin}>What I Bring</h2>
            <div className={styles.cardHeaderRight}>
              <Wrench className={styles.iconSmall} />
              <span className={styles.cardHint}>Balanced across build + support</span>
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

        {/* Interests */}
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