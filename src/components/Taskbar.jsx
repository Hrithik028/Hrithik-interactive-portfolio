import { useEffect, useRef, useState } from "react";
import styles from "../styles/Taskbar.module.css";
import { Grid2X2, LogOut, Wifi } from "lucide-react";
import { ASSETS } from "../config/assets";
import startHereFallback from "../assets/icons/start-here.png";

export default function Taskbar({
  openWindows,
  activeWindow,
  onWindowClick,
  isMobile = false,
  onLogout,
  shortcuts = [],
  onShortcutClick,
  onOpenAll,
  profileImage,
}) {
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [startOpen, setStartOpen] = useState(false);
  const startRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const closeIfOutside = (e) => {
      if (!startRef.current) return;
      if (!startRef.current.contains(e.target)) {
        setStartOpen(false);
      }
    };

    document.addEventListener("mousedown", closeIfOutside);
    document.addEventListener("touchstart", closeIfOutside);

    return () => {
      document.removeEventListener("mousedown", closeIfOutside);
      document.removeEventListener("touchstart", closeIfOutside);
    };
  }, []);

  const handleLogOff = () => {
    setStartOpen(false);
    onLogout?.();
  };

  return (
    <div
      data-desktop-context="ignore"
      className={`${styles.root} ${isMobile ? styles.rootMobile : ""}`}
    >
      <div ref={startRef} className={styles.startWrap}>
        <button
          type="button"
          className={`${styles.startBtn} ${isMobile ? styles.startBtnMobile : ""}`}
          onClick={() => setStartOpen((prev) => !prev)}
          title="Start"
        >
          <img
            src={ASSETS.icons.startHere}
            alt=""
            className={styles.startIconImg}
            draggable="false"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = startHereFallback;
            }}
          />
          {!isMobile && <span>Start</span>}
        </button>

        {startOpen && (
          <div className={`${styles.startMenu} ${isMobile ? styles.startMenuMobile : ""}`}>
            <div className={styles.startHeader}>
              <div className={styles.startAvatar}>
                {profileImage ? (
                  <img src={profileImage} alt="" className={styles.startAvatarImg} draggable="false" />
                ) : null}
              </div>
              <div>
                <div className={styles.startName}>Hrithik OS</div>
                <div className={styles.startVersion}>Windows XP Portfolio</div>
              </div>
            </div>

            <div className={styles.menuSection}>
              {shortcuts.map((item) => {
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={styles.menuItem}
                    onClick={() => {
                      setStartOpen(false);
                      onShortcutClick?.(item.id);
                    }}
                  >
                    {item.iconSrc ? (
                      <img
                        src={item.iconSrc}
                        alt=""
                        className={styles.menuIconImg}
                        draggable="false"
                      />
                    ) : (
                      <Grid2X2 className={styles.menuIcon} />
                    )}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className={styles.menuItem}
              onClick={() => {
                setStartOpen(false);
                onOpenAll?.();
              }}
            >
              <Grid2X2 className={styles.menuIcon} />
              <span>Open Recruiter Layout</span>
            </button>

            <button
              type="button"
              className={styles.menuItem}
              onClick={handleLogOff}
            >
              <LogOut className={styles.menuIcon} />
              <span>Log Off</span>
            </button>
          </div>
        )}
      </div>

      <div className={`${styles.windows} ${isMobile ? styles.windowsMobile : ""}`}>
        {openWindows.map((window) => {
          const isActive = activeWindow === window.id;

          const btnClassName = [
            styles.winBtn,
            isMobile ? styles.winBtnMobile : "",
            isActive ? styles.winBtnActive : "",
            window.minimized ? styles.winBtnMinimized : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={window.id}
              type="button"
              className={btnClassName}
              onClick={() => onWindowClick(window.id)}
              title={window.label}
            >
              <span className={styles.winIconWrap}>
                {window.iconSrc ? (
                  <img
                    src={window.iconSrc}
                    alt=""
                    className={styles.winIconImg}
                    draggable="false"
                  />
                ) : null}
              </span>

              {!isMobile && <span className={styles.winLabel}>{window.label}</span>}
            </button>
          );
        })}
      </div>

      <div className={`${styles.tray} ${isMobile ? styles.trayMobile : ""}`}>
        <Wifi className={styles.trayIcon} />
        <div className={`${styles.clock} ${isMobile ? styles.clockMobile : ""}`}>
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
