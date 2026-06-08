import { useEffect } from "react";
import { ASSETS } from "../config/assets";
import styles from "../styles/LogoffScreen.module.css";

export default function LogoffScreen({ name = "Guest", onComplete }) {
  useEffect(() => {
    const timer = window.setTimeout(() => onComplete?.(), 1250);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={styles.root}>
      <div className={styles.topBar} />
      <div className={styles.center}>
        <img
          src={ASSETS.icons.windowsLogo}
          alt="Windows XP"
          className={styles.logo}
          draggable="false"
        />
        <div className={styles.panel}>
          <div className={styles.avatar}>
            <img src={ASSETS.images.profile} alt="" draggable="false" />
          </div>
          <div>
            <h1>Logging off</h1>
            <p>Saving {name}'s portfolio session...</p>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        Returning to the Windows XP Portfolio login screen
      </div>
    </div>
  );
}
