import { useState, useEffect } from "react";
import { ASSETS } from "../config/assets";

import Taskbar from "./Taskbar";
import Window from "./Window";

import AboutWindow from "./windows/AboutWindow";
import ProjectsWindow from "./windows/ProjectsWindow";
import SkillsWindow from "./windows/SkillsWindow";
import ResearchWindow from "./windows/ResearchWindow";
import ContactWindow from "./Contact";
import ResumeWindow from "./windows/ResumeWindow";
/*import CertificationsWindow from "./windows/CertificationsWindow";*/
import ExperienceWindow from "./windows/ExperienceWindow";
import DashboardWindow from "./windows/DashboardWindow";

const wallpaper = ASSETS.images.wallpaper

const DESKTOP_TASKBAR_HEIGHT = 32;
const MOBILE_TASKBAR_HEIGHT = 40;

const MOBILE_MAX = 639;
const TABLET_MAX = 1023;


const desktopIcons = [
  {
    id: "about",
    iconSrc: ASSETS.icons.myComputer,
    label: "About Me",
    component: AboutWindow,
  },
  {
    id: "projects",
    iconSrc: ASSETS.icons.documents,
    label: "Projects",
    component: ProjectsWindow,
  },
  {
    id: "resume",
    iconSrc: ASSETS.icons.resume,
    label: "Resume",
    component: ResumeWindow,
  },
  {
    id: "skills",
    iconSrc: ASSETS.icons.technical,
    label: "Technical Skills",
    component: SkillsWindow,
  },
  {
    id: "experience",
    iconSrc: ASSETS.icons.briefcase,
    label: "Experience",
    component: ExperienceWindow,
  },
  {
    id: "research",
    iconSrc: ASSETS.icons.monitor,
    label: "Research",
    component: ResearchWindow,
  },
  {
    id: "contact",
    iconSrc: ASSETS.icons.explorer,
    label: "Contact",
    component: ContactWindow,
  },
  {
    id: "dashboard",
    iconSrc: ASSETS.icons.dashboard,
    label: "Dashboard",
    component: DashboardWindow
  }
  /*{
    id: "certifications",
    iconSrc: terminalIcon,
    label: "Certifications",
    component: CertificationsWindow,
  },*/
];

function getViewportMode() {
  const width = window.innerWidth;

  if (width <= MOBILE_MAX) return "mobile";
  if (width <= TABLET_MAX) return "tablet";
  return "desktop";
}

// --- Recruiter preset layout (tweak these numbers to match your screen) ---
function computeSmallThreeWindowPreset(vw, vh, taskbarHeight) {
  const H = vh - taskbarHeight;
  const m = 14;

  const winH = Math.floor(H * 0.86);

  const aboutW = Math.min(520, Math.floor(vw * 0.3));
  const projectsW = Math.min(760, Math.floor(vw * 0.44));
  const skillsW = Math.max(420, vw - aboutW - projectsW - m * 4);

  const aboutX = m;
  const aboutY = m;

  const projectsX = aboutX + aboutW + m;
  const projectsY = m;

  const skillsX = projectsX + projectsW + m;
  const skillsY = m;

  return {
    open: ["about", "projects", "skills"],
    active: "projects",
    frames: {
      about: { x: aboutX, y: aboutY, w: aboutW, h: winH },
      projects: { x: projectsX, y: projectsY, w: projectsW, h: winH },
      skills: { x: skillsX, y: skillsY, w: skillsW, h: winH },
    },
  };
}

export default function Desktop({ session, onLogout }) {
  const isRecruiterMode =
    String(session?.mode || "").toLowerCase() === "recruiter";

  const defaultOpen = isRecruiterMode ? ["dashboard"] : [];
  const defaultActive = isRecruiterMode ? "dashboard" : null;

  const [openWindows, setOpenWindows] = useState(defaultOpen);
  const [activeWindow, setActiveWindow] = useState(defaultActive);
  const [hasShownPreset, setHasShownPreset] = useState(false);
  const [winState, setWinState] = useState({});
  const [frames, setFrames] = useState({});
  const [viewport, setViewport] = useState(() => getViewportMode());

  const isMobile = viewport === "mobile";
  const isTablet = viewport === "tablet";
  const isDesktop = viewport === "desktop";
  const taskbarHeight = isMobile
    ? MOBILE_TASKBAR_HEIGHT
    : DESKTOP_TASKBAR_HEIGHT;

  useEffect(() => {
    let resizeTimer;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setViewport(getViewportMode());
      }, 120);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
  if (isMobile) {
    if (
      activeWindow &&
      openWindows.includes(activeWindow) &&
      !winState[activeWindow]?.minimized
    ) {
      return;
    }

    const lastVisible = [...openWindows]
      .reverse()
      .find((id) => !winState[id]?.minimized);

    setActiveWindow(lastVisible ?? null);
    return;
  }

  if (
    !activeWindow ||
    !openWindows.includes(activeWindow) ||
    winState[activeWindow]?.minimized
  ) {
    const lastVisible = [...openWindows]
      .reverse()
      .find((id) => !winState[id]?.minimized);

    setActiveWindow(lastVisible ?? null);
  }
}, [isMobile, openWindows, activeWindow, winState]);

  useEffect(() => {
    setFrames((prev) => {
      const next = { ...prev };

      for (const id of openWindows) {
        if (isMobile) {
          next[id] = {
            ...(next[id] ?? {}),
            x: 0,
            y: 0,
            w: window.innerWidth,
            h: window.innerHeight - taskbarHeight,
          };
        } else if (next[id]) {
          next[id] = {
            ...next[id],
            x: Math.max(0, Math.min(next[id].x ?? 0, window.innerWidth - (next[id].w ?? 600))),
            y: Math.max(0, Math.min(next[id].y ?? 0, window.innerHeight - taskbarHeight - (next[id].h ?? 500))),
          };
        }
      }

      return next;
    });
  }, [viewport, openWindows, taskbarHeight, isMobile]);

  // const taskbarHeight = isMobile
  //  ? MOBILE_TASKBAR_HEIGHT
  //  : DESKTOP_TASKBAR_HEIGHT;

  useEffect(() => {
    if (!isRecruiterMode) return;

    setOpenWindows((prev) => (prev.length ? prev : ["dashboard"]));
    setActiveWindow((prev) => prev ?? "dashboard");
    setWinState((prev) => ({
      ...prev,
      dashboard: prev.dashboard ?? { minimized: false, maximized: false },
    }));

    setFrames((prev) => {
      if (prev.dashboard) return prev;

      const vw = window.innerWidth;
      const vh = window.innerHeight - taskbarHeight;

      const w = Math.min(920, Math.floor(vw * 0.62));
      const h = Math.min(640, Math.floor(vh * 0.72));
      const x = Math.max(12, Math.floor((vw - w) / 2));
      const y = Math.max(12, Math.floor((vh - h) / 2));

      return {
        ...prev,
        dashboard: { x, y, w, h },
      };
    });
  }, [isRecruiterMode, taskbarHeight]);

  const ensureFrame = (windowId, index = 0) => {
    setFrames((prev) => {
      if (prev[windowId]) return prev;

      if (isMobile) {
        return {
          ...prev,
          [windowId]: {
            x: 0,
            y: 0,
            w: window.innerWidth,
            h: window.innerHeight - taskbarHeight,
          },
        };
      }

      const base = { x: 110 + index * 28, y: 80 + index * 28, w: 600, h: 500 };

      const presets = {
        dashboard: {
          x: 90,
          y: 70,
          w: Math.min(980, Math.floor(window.innerWidth * 0.82)),
          h: Math.min(
            720,
            Math.floor((window.innerHeight - taskbarHeight) * 0.78)
          ),
        },
        about: { w: 560, h: 520 },
        projects: { w: 820, h: 560 },
        skills: { w: 760, h: 540 },
        resume: { w: 860, h: 600 },
        experience: { w: 820, h: 560 },
        research: { w: 820, h: 560 },
        contact: { w: 640, h: 520 },
      };

      return {
        ...prev,
        [windowId]: { ...base, ...(presets[windowId] ?? {}) },
      };
    });
  };

  const openWindow = (windowId) => {
    if (isMobile) {
      setOpenWindows((prev) => (prev.includes(windowId) ? prev : [...prev, windowId]));
      setWinState((prev) => ({
        ...prev,
        [windowId]: {
          ...(prev[windowId] ?? {}),
          minimized: false,
          maximized: true,
        },
      }));
      setActiveWindow(windowId);
      ensureFrame(windowId, openWindows.length);
      return;
    }

    setOpenWindows((prev) => (prev.includes(windowId) ? prev : [...prev, windowId]));
    setWinState((prev) => ({
      ...prev,
      [windowId]: {
        ...(prev[windowId] ?? {}),
        minimized: false,
        maximized: false,
      },
    }));
    setActiveWindow(windowId);
    ensureFrame(windowId, openWindows.length);
  };

  const closeWindow = (windowId) => {
    if (windowId === "dashboard" && !isMobile) {
      if (!isRecruiterMode) {
        setOpenWindows((prev) => prev.filter((id) => id !== "dashboard"));

        setWinState((prev) => {
          const copy = { ...prev };
          delete copy.dashboard;
          return copy;
        });

        setFrames((prev) => {
          const copy = { ...prev };
          delete copy.dashboard;
          return copy;
        });

        setActiveWindow((current) => (current === "dashboard" ? null : current));
        return;
      }

      if (hasShownPreset) {
        setOpenWindows((prev) => prev.filter((id) => id !== "dashboard"));

        setWinState((prev) => {
          const copy = { ...prev };
          delete copy.dashboard;
          return copy;
        });

        setFrames((prev) => {
          const copy = { ...prev };
          delete copy.dashboard;
          return copy;
        });

        setActiveWindow((current) => (current === "dashboard" ? null : current));
        return;
      }

      const preset = computeSmallThreeWindowPreset(
        window.innerWidth,
        window.innerHeight,
        taskbarHeight
      );

      setOpenWindows(preset.open);
      setActiveWindow(preset.active);

      const nextState = {};
      for (const id of preset.open) {
        nextState[id] = { minimized: false, maximized: false };
      }

      setWinState(nextState);
      setFrames(preset.frames);
      setHasShownPreset(true);
      return;
    }

    setOpenWindows((prev) => {
      const next = prev.filter((id) => id !== windowId);

      setActiveWindow((current) => {
        if (current !== windowId) return current;

        for (let i = next.length - 1; i >= 0; i--) {
          const id = next[i];
          if (!winState[id]?.minimized) return id;
        }

        return null;
      });

      return next;
    });

    setWinState((prev) => {
      const copy = { ...prev };
      delete copy[windowId];
      return copy;
    });

    setFrames((prev) => {
      const copy = { ...prev };
      delete copy[windowId];
      return copy;
    });
  };

  const focusWindow = (windowId) => {
    setWinState((prev) => ({
      ...prev,
      [windowId]: { ...(prev[windowId] ?? {}), minimized: false },
    }));
    setActiveWindow(windowId);
  };

  const minimizeWindow = (windowId) => {
    setWinState((prev) => ({
      ...prev,
      [windowId]: {
        ...(prev[windowId] ?? {}),
        minimized: true,
        maximized: false,
      },
    }));

    setActiveWindow((current) => {
      if (current !== windowId) return current;

      const remaining = openWindows.filter((id) => id !== windowId);
      for (let i = remaining.length - 1; i >= 0; i--) {
        const id = remaining[i];
        if (!winState[id]?.minimized) return id;
      }
      return null;
    });
  };

  const toggleMaximize = (windowId) => {
    setWinState((prev) => ({
      ...prev,
      [windowId]: {
        ...(prev[windowId] ?? { minimized: false, maximized: false }),
        minimized: false,
        maximized: !prev[windowId]?.maximized,
      },
    }));
    setActiveWindow(windowId);
  };

  const handleTaskbarClick = (windowId) => {
    if (isMobile) {
      return focusWindow(windowId);
    }

    const state = winState[windowId];
    if (state?.minimized) return focusWindow(windowId);
    if (activeWindow === windowId) return minimizeWindow(windowId);
    return focusWindow(windowId);
  };

  const taskbarWindows = openWindows.map((id) => {
    const icon = desktopIcons.find((i) => i.id === id);

    return {
      id,
      label: icon?.label || "",
      iconSrc: icon?.iconSrc || "",
      minimized: winState[id]?.minimized ?? false,
    };
  });

  const activeWindowExists =
    !!activeWindow && openWindows.includes(activeWindow);

  const activeWindowVisible =
    activeWindowExists && !winState[activeWindow]?.minimized;

  const hasVisibleMobileWindow = isMobile && activeWindowVisible;
  const showMobileHome = isMobile && !hasVisibleMobileWindow;


  const renderWindows = () =>
    openWindows.map((windowId, index) => {
      const iconData = desktopIcons.find((icon) => icon.id === windowId);
      if (!iconData) return null;

      const state = winState[windowId] ?? {
        minimized: false,
        maximized: false,
      };

      if (state.minimized) return null;
      if (isMobile && activeWindow !== windowId) return null;

      const frame = frames[windowId] ?? {
        x: 100 + index * 30,
        y: 80 + index * 30,
        w: 600,
        h: 500,
      };

      console.log("rendering window", {
      windowId,
      isMobile,
      activeWindow,
      state,
      frame,
    });

      const WindowComponent = iconData.component;

      return (
        <Window
          key={windowId}
          title={iconData.label}
          isActive={activeWindow === windowId}
          isMinimized={state.minimized}
          isMaximized={state.maximized}
          isMobile={isMobile}
          taskbarHeight={taskbarHeight}
          onClose={() => closeWindow(windowId)}
          onFocus={() => focusWindow(windowId)}
          onMinimize={() => minimizeWindow(windowId)}
          onToggleMaximize={() => toggleMaximize(windowId)}
          initialPosition={{ x: frame.x, y: frame.y }}
          initialSize={{ w: frame.w, h: frame.h }}
        >
          <WindowComponent onOpen={openWindow} />
        </Window>
      );
    });

  const renderDesktopShell = () => (
    <>
      <div
      className="absolute top-3 left-3 z-10 grid grid-cols-1 gap-1 md:gap-3 overflow-y-auto pr-1"
      style={{ maxHeight: `calc(100vh - ${taskbarHeight}px)` }}
      >
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className="w-[72px] sm:w-[80px] md:w-[96px] select-none cursor-pointer"
            onClick={() => openWindow(icon.id)}
            onDoubleClick={() => openWindow(icon.id)}
          >
            <div className="flex flex-col items-center px-1 py-1 rounded-md hover:bg-white/15 active:bg-white/20 transition">
              <img
                src={icon.iconSrc}
                alt={icon.label}
                className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12"
              />
              <span className="text-[10px] sm:text-[11px] md:text-[12px] leading-tight text-white text-center">
                {icon.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {renderWindows()}

      <Taskbar
        onLogout={onLogout}
        openWindows={taskbarWindows}
        activeWindow={activeWindow}
        onWindowClick={handleTaskbarClick}
        isMobile={false}
      />
    </>
  );

  const renderMobileShell = () => (
    <>
      {showMobileHome && (
        <div className="absolute top-4 left-0 right-0 z-10 px-4 grid grid-cols-3 gap-4 max-h-[calc(100vh-56px)] overflow-y-auto">
          {desktopIcons.map((icon) => (
            <div
              key={icon.id}
              className="min-w-0 select-none cursor-pointer"
              onClick={() => openWindow(icon.id)}
            >
              <div className="flex flex-col items-center justify-center rounded-xl bg-black/25 px-2 py-3 active:bg-white/20 transition">
                <img
                  src={icon.iconSrc}
                  alt={icon.label}
                  className="w-10 h-10 mb-1"
                />
                <span className="text-[11px] leading-tight text-center text-white">
                  {icon.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {renderWindows()}

      <Taskbar
        onLogout={onLogout}
        openWindows={taskbarWindows}
        activeWindow={activeWindow}
        onWindowClick={handleTaskbarClick}
        isMobile={true}
      />
    </>
  );

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />
      {isMobile ? renderMobileShell() : renderDesktopShell()}
    </div>
  );
}