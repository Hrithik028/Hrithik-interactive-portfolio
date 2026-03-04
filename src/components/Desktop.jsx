import { useState, useEffect, useMemo } from "react";
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
const TASKBAR_HEIGHT = 32;

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

// --- Recruiter preset layout (tweak these numbers to match your screen) ---
function computeSmallThreeWindowPreset(vw, vh) {
  const H = vh - TASKBAR_HEIGHT;
  const m = 14;

  // Equal heights
  const winH = Math.floor(H * 0.86);

  // Three columns widths
  const aboutW = Math.min(520, Math.floor(vw * 0.30));
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
  // Recruiter mode: dashboard opens; Non-recruiter: nothing opens by default
  const isRecruiterMode = String(session?.mode || "").toLowerCase() === "recruiter";
  const defaultOpen = isRecruiterMode ? ["dashboard"] : [];
  const defaultActive = isRecruiterMode ? "dashboard" : null;

  const [openWindows, setOpenWindows] = useState(defaultOpen);
  const [activeWindow, setActiveWindow] = useState(defaultActive);

  const [hasShownPreset, setHasShownPreset] = useState(false);

  // per-window ui state
  const [winState, setWinState] = useState({});
  // per-window frame (pos + size)
  const [frames, setFrames] = useState({});

  // Optional: if session loads AFTER initial render, ensure recruiter sees dashboard
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
      const vh = window.innerHeight - TASKBAR_HEIGHT;

      // size
      const w = Math.min(920, Math.floor(vw * 0.62));
      const h = Math.min(640, Math.floor(vh * 0.72));

      // centered position
      const x = Math.max(12, Math.floor((vw - w) / 2));
      const y = Math.max(12, Math.floor((vh - h) / 2));

      return {
        ...prev,
        dashboard: { x, y, w, h },
      };
    });
  }, [isRecruiterMode]);

  const ensureFrame = (windowId, index = 0) => {
    setFrames((prev) => {
      if (prev[windowId]) return prev;

      const base = { x: 110 + index * 28, y: 80 + index * 28, w: 600, h: 500 };

      const presets = {
        dashboard: {
          x: 90,
          y: 70,
          w: Math.min(980, Math.floor(window.innerWidth * 0.82)),
          h: Math.min(
            720,
            Math.floor((window.innerHeight - TASKBAR_HEIGHT) * 0.78)
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

      return { ...prev, [windowId]: { ...base, ...(presets[windowId] ?? {}) } };
    });
  };

  const openWindow = (windowId) => {
    setOpenWindows((prev) => (prev.includes(windowId) ? prev : [...prev, windowId]));
    setWinState((prev) => ({
      ...prev,
      [windowId]: { ...(prev[windowId] ?? {}), minimized: false, maximized: false },
    }));
    setActiveWindow(windowId);
    ensureFrame(windowId, openWindows.length);
  };

  const closeWindow = (windowId) => {
    // Only recruiters get the 3-window preset when closing dashboard
    if (windowId === "dashboard") {
      if (!isRecruiterMode) {
        // non-recruiter: just close dashboard normally
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

      // recruiter: show 3-window preset ONCE
      if (hasShownPreset) {
        // close dashboard normally after first time
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

      const preset = computeSmallThreeWindowPreset(window.innerWidth, window.innerHeight);

      setOpenWindows(preset.open);
      setActiveWindow(preset.active);

      const nextState = {};
      for (const id of preset.open) nextState[id] = { minimized: false, maximized: false };
      setWinState(nextState);
      setFrames(preset.frames);

      setHasShownPreset(true);
      return;
    }

    // Normal close for other windows
    setOpenWindows((prev) => {
      const next = prev.filter((id) => id !== windowId);

      setActiveWindow((current) => {
        if (current !== windowId) return current;
        return next.length > 0 ? next[next.length - 1] : null;
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
      [windowId]: { ...(prev[windowId] ?? {}), minimized: true, maximized: false },
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
    const state = winState[windowId];
    if (state?.minimized) return focusWindow(windowId);
    if (activeWindow === windowId) return minimizeWindow(windowId);
    return focusWindow(windowId);
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />

      {/* Desktop Icons */}
      <div className="absolute top-3 left-3 z-10 grid grid-cols-1 min-[420px]:grid-cols-1
                gap-1 md:gap-3 max-h-[calc(100vh-48px)] overflow-y-auto pr-1">
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className="w-[72px] sm:w-[80px] md:w-[96px] select-none cursor-pointer"
            onClick={() => openWindow(icon.id)}
            onDoubleClick={() => openWindow(icon.id)}
          >
            <div className="flex flex-col items-center px-1 py-1 rounded-md hover:bg-white/15 active:bg-white/20 transition">
              <img src={icon.iconSrc} alt={icon.label} className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12" />
              <span className="text-[10px] sm:text-[11px] md:text-[12px] leading-tight text-white">
                {icon.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Windows */}
      {openWindows.map((windowId, index) => {
        const iconData = desktopIcons.find((icon) => icon.id === windowId);
        if (!iconData) return null;

        const WindowComponent = iconData.component;
        const state = winState[windowId] ?? { minimized: false, maximized: false };

        const frame = frames[windowId] ?? {
          x: 100 + index * 30,
          y: 80 + index * 30,
          w: 600,
          h: 500,
        };

        return (
          <Window
            key={windowId}
            title={iconData.label}
            isActive={activeWindow === windowId}
            isMinimized={state.minimized}
            isMaximized={state.maximized}
            onClose={() => closeWindow(windowId)}
            onFocus={() => focusWindow(windowId)}
            onMinimize={() => minimizeWindow(windowId)}
            onToggleMaximize={() => toggleMaximize(windowId)}
            initialPosition={{ x: frame.x, y: frame.y }}
            initialSize={{ w: frame.w, h: frame.h }}
          >
            {/* critical: allow dashboard buttons to open other windows */}
            <WindowComponent onOpen={openWindow} />
          </Window>
        );
      })}

      {/* Taskbar */}
      <Taskbar
        onLogout={onLogout}
        openWindows={openWindows.map((id) => {
          const icon = desktopIcons.find((i) => i.id === id);
          return {
            id,
            label: icon?.label || "",
            iconSrc: icon?.iconSrc || "",
            minimized: winState[id]?.minimized ?? false,
          };
        })}
        activeWindow={activeWindow}
        onWindowClick={handleTaskbarClick}
      />
    </div>
  );
}