import { useEffect, useRef, useState } from "react";
import { X, Minus, Square, HelpCircle } from "lucide-react";
import styles from "../styles/Window.module.css";

 // const maxY = Math.max(0, window.innerHeight - taskbarHeight - h); // must match Taskbar height (h-8)

export default function Window({
  title,
  children,
  isActive,
  isMinimized,
  isMaximized,
  isMobile = false,
  taskbarHeight = 32,
  onClose,
  onFocus,
  onMinimize,
  onToggleMaximize,
  initialPosition,
  initialSize,
}) {
  // Hooks must run on every render
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(() => initialSize || { w: 600, h: 500 });
  const [restorePosition, setRestorePosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const clampPosition = (x, y) => {
    const rect = windowRef.current?.getBoundingClientRect();
    const w = rect?.width ?? size.w ?? 600;
    const h = rect?.height ?? size.h ?? 500;

    const maxX = Math.max(0, window.innerWidth - w);
    const maxY = Math.max(0, window.innerHeight - taskbarHeight - h);

    return {
      x: Math.max(0, Math.min(maxX, x)),
      y: Math.max(0, Math.min(maxY, y)),
    };
  };

  const handleMouseDown = (e) => {
    if (isMobile || isMaximized) return;

    const target = e.target;
    const inHeader = target?.closest?.(`.${styles.titleBar}`);
    if (!inHeader) return;

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    onFocus?.();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || isMaximized) return;

      const next = clampPosition(e.clientX - dragOffset.x, e.clientY - dragOffset.y);
      setPosition(next);
      setRestorePosition(next);
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, isMaximized]);

  // When restoring from maximized, snap back
  useEffect(() => {
    if (!isMaximized) {
      setPosition((prev) => restorePosition || prev);
    }
  }, [isMaximized, restorePosition]);

  const rootStyle = isMobile
    ? {
        left: 0,
        top: 0,
        width: "100vw",
        height: `calc(100vh - ${taskbarHeight}px)`,
        borderRadius: 0,
      }
    : isMaximized
    ? {
        left: 0,
        top: 0,
        width: "100vw",
        height: `calc(100vh - ${taskbarHeight}px)`,
      }
    : {
        left: position.x,
        top: position.y,
        width: `${size.w}px`,
        height: `${size.h}px`,
        minWidth: "320px",
        minHeight: "300px",
      };

  useEffect(() => {
    if (isMobile) {
      setPosition({ x: 0, y: 0 });
      setSize({
        w: window.innerWidth,
        h: window.innerHeight - taskbarHeight,
      });
      return;
    }

    setPosition((prev) => initialPosition ?? prev);
    setSize((prev) => initialSize ?? prev);
  }, [isMobile, taskbarHeight, initialPosition, initialSize]);

  // Early return after hooks
  if (isMinimized) return null;

  return (
    <div
      ref={windowRef}
      className={`${styles.window} ${isMobile ? styles.mobileWindow : ""} ${isActive ? styles.active : styles.inactive}`}
      style={rootStyle}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`${styles.titleBar} ${isMobile || isMaximized ? styles.noDrag : styles.drag}`}
        onMouseDown={handleMouseDown}
        onDoubleClick={() => {
          if (isMobile) return;
          if (!isMaximized) setRestorePosition(position);
          onToggleMaximize?.();
        }}
      >
        <div className={styles.left}>
          <div className={styles.titleIcon} aria-hidden="true">
            <HelpCircle className={styles.helpIcon} />
          </div>
          <span
            className={`${styles.titleText} ${isMobile ? styles.titleTextMobile : ""}`}
            title={title}
          >
            {title}
          </span>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            onClick={() => onMinimize?.()}
            className={`${styles.ctrlBtn} ${styles.ctrlMin} ${isMobile ? styles.ctrlBtnMobile : ""}`}
            title="Minimize"
          >
            <Minus className={styles.ctrlIcon} />
          </button>

          <button
            type="button"
            onClick={() => {
              if (isMobile) return;
              if (!isMaximized) setRestorePosition(position);
              onToggleMaximize?.();
            }}
            className={`${styles.ctrlBtn} ${styles.ctrlMax} ${isMobile ? styles.ctrlBtnMobile : ""}`}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            <Square className={styles.ctrlIcon} />
          </button>

          <button
            type="button"
            onClick={() => onClose?.()}
            className={`${styles.ctrlBtn} ${styles.ctrlClose} ${isMobile ? styles.ctrlBtnMobile : ""}`}
            title="Close"
          >
            <X className={styles.ctrlIcon} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`${styles.content} ${isMobile ? styles.contentMobile : ""}`}>
        {children}
      </div>
    </div>
  );
}