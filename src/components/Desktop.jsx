import { useState } from "react";

import myComputerIcon from "../assets/icons/Mycomputer-3.png";
import documentsIcon from "../assets/icons/books.png";
import resumeIcon from "../assets/icons/abiword.png";
import networkIcon from "../assets/icons/Network-3.png";
import networkAltIcon from "../assets/icons/explorer.png";
import briefcaseIcon from "../assets/icons/briefcase.png";
import monitorIcon from "../assets/icons/utilities-system-monitor.png";
import terminalIcon from "../assets/icons/utilities-terminal.png";

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

import wallpaper from "../assets/wallpaper4.jpeg";

const desktopIcons = [
  {
    id: "about",
    iconSrc: myComputerIcon,
    label: "About Me",
    component: AboutWindow,
  },
  {
    id: "projects",
    iconSrc: documentsIcon,
    label: "Projects",
    component: ProjectsWindow,
  },
  {
    id: "resume",
    iconSrc: resumeIcon,
    label: "Resume",
    component: ResumeWindow,
  },
  {
    id: "skills",
    iconSrc: networkIcon,
    label: "Technical Skills",
    component: SkillsWindow,
  },
  {
    id: "experience",
    iconSrc: briefcaseIcon,
    label: "Experience",
    component: ExperienceWindow,
  },
  {
    id: "research",
    iconSrc: monitorIcon,
    label: "Research",
    component: ResearchWindow,
  },
  {
    id: "contact",
    iconSrc: networkAltIcon,
    label: "Contact",
    component: ContactWindow,
  },
  /*{
    id: "certifications",
    iconSrc: terminalIcon,
    label: "Certifications",
    component: CertificationsWindow,
  },*/
];

export default function Desktop({ onLogout }) {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);

  // NEW: per-window ui state
  const [winState, setWinState] = useState({});
  // winState[id] = { minimized: bool, maximized: bool }

  const openWindow = (windowId) => {
    setOpenWindows((prev) => (prev.includes(windowId) ? prev : [...prev, windowId]));
    setWinState((prev) => ({
      ...prev,
      [windowId]: prev[windowId] ?? { minimized: false, maximized: false },
      // if already exists, ensure it is visible
      ...(prev[windowId] ? { [windowId]: { ...prev[windowId], minimized: false } } : {}),
    }));
    setActiveWindow(windowId);
  };

  const closeWindow = (windowId) => {
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
  };

  const focusWindow = (windowId) => {
    setWinState((prev) => ({
      ...prev,
      [windowId]: { ...(prev[windowId] ?? {}), minimized: false }, // focusing restores if minimized
    }));
    setActiveWindow(windowId);
  };

  const minimizeWindow = (windowId) => {
    setWinState((prev) => ({
      ...prev,
      [windowId]: { ...(prev[windowId] ?? {}), minimized: true, maximized: false },
    }));

    // pick next active window (last open that's not minimized)
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

  // XP-style: click taskbar button
  // - if minimized -> restore+focus
  // - else if active -> minimize (optional but feels very XP)
  // - else -> focus
  const handleTaskbarClick = (windowId) => {
    const state = winState[windowId];
    if (state?.minimized) return focusWindow(windowId);
    if (activeWindow === windowId) return minimizeWindow(windowId); // optional XP behaviour
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
      <div className="absolute top-4 left-4 grid grid-cols-1 gap-1 z-10">
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className="w-24 select-none cursor-pointer"
            onClick={() => openWindow(icon.id)}
            onDoubleClick={() => openWindow(icon.id)}
          >
            <div className="flex flex-col items-center px-2 py-2 rounded-md hover:bg-white/15 active:bg-white/20 transition">
              <img
                src={icon.iconSrc}
                alt={icon.label}
                className="w-12 h-12 drop-shadow"
              />

              <span className="mt-1 text-white text-[11px] text-center drop-shadow">
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
            initialPosition={{ x: 100 + index * 30, y: 80 + index * 30 }}
          >
            <WindowComponent />
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