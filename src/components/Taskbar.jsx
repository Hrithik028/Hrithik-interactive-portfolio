import { useEffect, useRef, useState } from "react";
import styles from "../styles/Taskbar.module.css";
import { Menu, LogOut, Volume2, Wifi } from "lucide-react";

export default function Taskbar({ openWindows, activeWindow, onWindowClick, onLogout }) {
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [startOpen, setStartOpen] = useState(false);
  const startRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close Start menu when clicking outside
  useEffect(() => {
    const onMouseDown = (e) => {
      if (!startRef.current) return;
      if (!startRef.current.contains(e.target)) setStartOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const handleLogOff = () => {
    setStartOpen(false);
    onLogout?.(); // ✅ back to LoginScreen
  };

  return (
    <div className={styles.root}>
      {/* Start Button + Menu */}
      <div ref={startRef} className={styles.startWrap}>
        <button
          type="button"
          className={styles.startBtn}
          onClick={() => setStartOpen((s) => !s)}
        >
          <Menu className={styles.startIcon} />
          Start
        </button>

        {startOpen && (
          <div className={styles.startMenu}>
            <button type="button" className={styles.menuItem} onClick={handleLogOff}>
              <LogOut className={styles.menuIcon} />
              Log Off
            </button>
          </div>
        )}
      </div>

      {/* Open Windows */}
      <div className={styles.windows}>
        {openWindows.map((window) => {
          const isActive = activeWindow === window.id;

          const classNames = [
            styles.winBtn,
            isActive ? styles.winBtnActive : "",
            window.minimized ? styles.winBtnMinimized : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={window.id}
              type="button"
              onClick={() => onWindowClick(window.id)}
              className={classNames}
              title={window.label}
            >
              <span className={styles.winIconWrap}>
                {window.iconSrc && (
                  <img
                    src={window.iconSrc}
                    alt=""
                    className={styles.winIconImg}
                    draggable="false"
                  />
                )}
              </span>

              <span className={styles.winLabel}>{window.label}</span>
            </button>
          );
        })}
      </div>

      {/* System Tray */}
      <div className={styles.tray}>
        <Volume2 className={styles.trayIcon} />
        <Wifi className={styles.trayIcon} />
        <div className={styles.clock}>
          {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  );
}