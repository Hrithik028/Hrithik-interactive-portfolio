import React from "react";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import styles from "./Contact.module.css";

/**
 * Usage:
 *  <Contact variant="window" />
 *  <Contact variant="section" />
 *
 * If you're building a Windows-OS portfolio, you'll mostly use: variant="window"
 */
export default function Contact({ variant = "window" }) {
  const onSubmit = (e) => {
    e.preventDefault();
    alert("Message sending is not wired up yet.");
  };

  // TODO: replace with real info
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

  const ContactForm = ({ compact = false }) => (
    <div className={compact ? styles.formCardCompact : styles.formCard}>
      <h3 className={compact ? styles.titleSm : styles.titleMd}>Send a Message</h3>

      <form
        className={compact ? styles.formCompact : styles.form}
        onSubmit={onSubmit}
      >
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`name-${variant}`}>
            {compact ? "Name" : "Full Name"}
          </label>
          <input
            className={compact ? styles.inputCompact : styles.input}
            id={`name-${variant}`}
            type="text"
            placeholder={compact ? "Your name" : "Your full name"}
            autoComplete="name"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`email-${variant}`}>
            Email
          </label>
          <input
            className={compact ? styles.inputCompact : styles.input}
            id={`email-${variant}`}
            type="email"
            placeholder="your.email@example.com"
            autoComplete="email"
          />
        </div>

        {!compact && (
          <div className={styles.field}>
            <label className={styles.label} htmlFor={`subject-${variant}`}>
              Subject
            </label>
            <input
              className={styles.input}
              id={`subject-${variant}`}
              type="text"
              placeholder="Opportunity discussion"
            />
          </div>
        )}

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`message-${variant}`}>
            Message
          </label>
          <textarea
            className={compact ? styles.textareaCompact : styles.textarea}
            id={`message-${variant}`}
            rows={compact ? 3 : 4}
            placeholder={compact ? "Your message..." : "Tell me about the opportunity..."}
          />
        </div>

        <button
          type="submit"
          className={`${styles.button} ${styles.buttonBlue} ${styles.buttonFull} ${compact ? styles.buttonCompact : ""
            }`}
        >
          {compact ? (
            <>
              <Send className={styles.buttonIcon} />
              Send Message
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
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
          <ContactForm compact />
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

          <ContactForm />
        </div>
      </div>
    </section>
  );
}