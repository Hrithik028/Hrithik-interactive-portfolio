import { useEffect, useRef, useState } from "react";
import { X, Minus, Square, HelpCircle } from "lucide-react";

const TASKBAR_HEIGHT = 32; // must match Taskbar height (h-8)

export default function Window({
  title,
  children,
  isActive,
  isMinimized,
  isMaximized,
  onClose,
  onFocus,
  onMinimize,
  onToggleMaximize,
  initialPosition,
}) {
  // ✅ Hooks must run on every render (no early returns above)
  const [position, setPosition] = useState(initialPosition);
  const [restorePosition, setRestorePosition] = useState(initialPosition); // last non-maximized pos
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const clampPosition = (x, y) => {
    const rect = windowRef.current?.getBoundingClientRect();
    const w = rect?.width ?? 600;
    const h = rect?.height ?? 500;

    const maxX = Math.max(0, window.innerWidth - w);
    const maxY = Math.max(0, window.innerHeight - TASKBAR_HEIGHT - h);

    return {
      x: Math.max(0, Math.min(maxX, x)),
      y: Math.max(0, Math.min(maxY, y)),
    };
  };

  const handleMouseDown = (e) => {
    if (isMaximized) return; // don't drag when maximized

    const target = e.target;
    const inHeader = target?.closest?.(".window-header");

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
      setRestorePosition(next); // keep restore position in sync while dragging
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

  // When restoring from maximized, snap back to last known restore position
  useEffect(() => {
    if (!isMaximized) {
      setPosition((prev) => restorePosition || prev);
    }
  }, [isMaximized, restorePosition]);

  const rootStyle = isMaximized
    ? {
      left: 0,
      top: 0,
      width: "100vw",
      height: `calc(100vh - ${TASKBAR_HEIGHT}px)`,
    }
    : {
      left: position.x,
      top: position.y,
      width: "600px",
      height: "500px",
      minWidth: "400px",
      minHeight: "300px",
    };

  // ✅ Early return ONLY after all hooks are declared
  if (isMinimized) return null;

  return (
    <div
      ref={windowRef}
      className={`absolute shadow-lg flex flex-col ${isActive ? "z-50" : "z-40"}`}
      style={{
        ...rootStyle,
        background: "#fff",
        border: "1px solid #0054E3",
        borderTop: "1px solid #316AC5",
      }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`window-header h-7 px-2 flex items-center justify-between ${isMaximized ? "cursor-default" : "cursor-move"
          }`}
        style={{
          background: isActive
            ? "linear-gradient(to right, #0054E3, #316AC5, #0054E3)"
            : "linear-gradient(to right, #7A7A7A, #ADADAD, #7A7A7A)",
          borderBottom: "1px solid #003C9D",
        }}
        onMouseDown={handleMouseDown}
        onDoubleClick={() => {
          // Windows behavior: double click header toggles maximize
          if (!isMaximized) setRestorePosition(position);
          onToggleMaximize?.();
        }}
      >
        <div className="flex items-center min-w-0">
          <div className="w-4 h-4 mr-2 bg-white/20 rounded-sm flex items-center justify-center shrink-0">
            <HelpCircle className="w-3 h-3 text-white" />
          </div>
          <span className="text-white text-xs font-normal truncate">{title}</span>
        </div>

        <div className="flex items-center shrink-0">
          {/* Minimize */}
          <button
            type="button"
            onClick={() => onMinimize?.()}
            className="w-5 h-4 border flex items-center justify-center mr-0.5"
            style={{
              background: "linear-gradient(to bottom, #E6F3FF, #B3D9FF)",
              borderColor: "#7BB3F0",
            }}
            title="Minimize"
          >
            <Minus className="w-2.5 h-2.5 text-black" />
          </button>

          {/* Maximize / Restore */}
          <button
            type="button"
            onClick={() => {
              if (!isMaximized) setRestorePosition(position);
              onToggleMaximize?.();
            }}
            className="w-5 h-4 border flex items-center justify-center mr-0.5"
            style={{
              background: "linear-gradient(to bottom, #E6F3FF, #B3D9FF)",
              borderColor: "#7BB3F0",
            }}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            <Square className="w-2.5 h-2.5 text-black" />
          </button>

          {/* Close */}
          <button
            type="button"
            onClick={() => onClose?.()}
            className="w-5 h-4 border flex items-center justify-center"
            style={{
              background: "linear-gradient(to bottom, #FFE6E6, #FFB3B3)",
              borderColor: "#F07B7B",
            }}
            title="Close"
          >
            <X className="w-2.5 h-2.5 text-black" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto" style={{ backgroundColor: "#F0F0F0" }}>
        {children}
      </div>
    </div>
  );
}