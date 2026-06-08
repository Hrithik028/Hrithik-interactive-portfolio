import React from "react";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import styles from "../styles/Contact.module.css";

/**
 * Usage:
 *  <Contact variant="window" />
 *  <Contact variant="section" />
 *
 * If you're building a Windows-OS portfolio, you'll mostly use: variant="window"
 */
export default function Contact({ variant = "window" }) {
  const email = "hrithik.jadhav028@gmail.com";
  const phoneDisplay = "+61 434 381 283";
  const phoneE164 = "+61434381283";
  const location = "Sydney, NSW, Australia";

  const githubUrl = "https://github.com/Hrithik028/";
  const linkedinUrl = "https://linkedin.com/in/hrithik-jadhav-a08068199/"

  const ContactInfoCard = ({ compact = false }) => (
    <div className={compact ? styles.cardSoft : ""}>
      <h3 className={compact ? styles.titleSm : styles.titleMd}>Get in Touch</h3>

      <div className={compact ? styles.stackSm : styles.stackMd}>
        <div className={styles.row}>
          <Mail className={styles.iconBlue} />
          <a className={styles.link} href={`mailto:${email}`}>
            {email}
          </a>
        </div>

        <div className={styles.row}>
          <Phone className={styles.iconBlue} />
          <a className={styles.link} href={`tel:${phoneE164}`}>
            {phoneDisplay}
          </a>
        </div>

        <div className={styles.row}>
          <MapPin className={styles.iconBlue} />
          <span className={styles.text}>{location}</span>
        </div>
      </div>
    </div>
  );

  const SocialLinks = ({ compact = false }) => (
    <div className={compact ? styles.cardSoft : ""}>
      <h4 className={styles.titleSm}>Connect Online</h4>

      {compact ? (
        <div className={styles.actions}>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className={`${styles.button} ${styles.buttonDark}`}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <Github className={styles.buttonIcon} />
            GitHub
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className={`${styles.button} ${styles.buttonBlue}`}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <Linkedin className={styles.buttonIcon} />
            LinkedIn
          </a>
        </div>
      ) : (
        <div className={styles.social}>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.socialButton}
            aria-label="GitHub"
            title="GitHub"
          >
            <Github className={styles.socialIcon} />
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.socialButton}
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <Linkedin className={styles.socialIcon} />
          </a>
        </div>
      )}
    </div>
  );

  // WINDOW VARIANT (best for your OS-portfolio)
  if (variant === "window") {
    return (
      <div className={styles.windowWrap}>
        <div className={styles.windowHeader}>
          <h1 className={styles.windowTitle}>Contact</h1>
        </div>

        <div className={styles.windowBody}>
          <ContactInfoCard compact />
          <SocialLinks compact />
        </div>
      </div>
    );
  }

  // SECTION VARIANT (if you still want a landing section)
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h2 className={styles.heroTitle}>Let&apos;s Connect</h2>
          <p className={styles.heroSubtitle}>
            Open to opportunities in AI, software engineering, and data science
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.left}>
            <ContactInfoCard />
            <SocialLinks />
          </div>

        </div>
      </div>
    </section>
  );
}
