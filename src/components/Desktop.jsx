import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ASSETS } from "../config/assets";
import styles from "../styles/Desktop.module.css";
import assistantIcon from "../assets/icons/Assistant.png";
import { Pause, Play, Volume1, Volume2, VolumeX } from "lucide-react";

import Taskbar from "./Taskbar";
import Window from "./Window";

const AboutWindow = lazy(() => import("./windows/AboutWindow"));
const ProjectsWindow = lazy(() => import("./windows/ProjectsWindow"));
const SkillsWindow = lazy(() => import("./windows/SkillsWindow"));
const ResearchWindow = lazy(() => import("./windows/ResearchWindow"));
const ContactWindow = lazy(() => import("./Contact"));
const ResumeWindow = lazy(() => import("./windows/ResumeWindow"));
const ExperienceWindow = lazy(() => import("./windows/ExperienceWindow"));
const DashboardWindow = lazy(() => import("./windows/DashboardWindow"));

const wallpaper = ASSETS.images.wallpaper

const DESKTOP_TASKBAR_HEIGHT = 32;
const MOBILE_TASKBAR_HEIGHT = 40;

const MOBILE_MAX = 639;
const TABLET_MAX = 1023;
const AUDIO_VOLUME_KEY = "desktop_background_volume";
const AUDIO_MUTED_KEY = "desktop_background_muted";
const AUDIO_PLAYING_KEY = "desktop_background_playing";
const AUDIO_TRACK_KEY = "desktop_background_track";
const AUDIO_WIDGET_POS_KEY = "desktop_audio_widget_position";


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

function computeRecruiterPreset(vw, vh, taskbarHeight, viewportMode) {
  const availableH = vh - taskbarHeight;
  const gap = viewportMode === "mobile" ? 10 : 14;
  const open = ["dashboard", "projects", "experience"];

  if (viewportMode === "mobile") {
    const w = vw - gap * 2;
    const h = Math.max(340, Math.min(520, Math.floor(availableH * 0.62)));

    return {
      open,
      active: "dashboard",
      frames: {
        dashboard: { x: gap, y: gap, w, h },
        projects: { x: gap, y: h + gap * 2, w, h },
        experience: { x: gap, y: h * 2 + gap * 3, w, h },
      },
      mobileStack: true,
    };
  }

  if (viewportMode === "tablet") {
    const topH = Math.floor((availableH - gap * 3) * 0.46);
    const bottomH = availableH - topH - gap * 3;
    const halfW = Math.floor((vw - gap * 3) / 2);

    return {
      open,
      active: "dashboard",
      frames: {
        dashboard: { x: gap, y: gap, w: vw - gap * 2, h: topH },
        projects: { x: gap, y: topH + gap * 2, w: halfW, h: bottomH },
        experience: { x: halfW + gap * 2, y: topH + gap * 2, w: halfW, h: bottomH },
      },
      mobileStack: false,
    };
  }

  const w = Math.floor((vw - gap * 4) / 3);
  const h = Math.floor(availableH * 0.86);

  return {
    open,
    active: "dashboard",
    frames: {
      dashboard: { x: gap, y: gap, w, h },
      projects: { x: w + gap * 2, y: gap, w, h },
      experience: { x: w * 2 + gap * 3, y: gap, w, h },
    },
    mobileStack: false,
  };
}

export default function Desktop({ session, onLogout }) {
  const audioRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const playlist = ASSETS.audio.playlist;
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
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [assistantOpen, setAssistantOpen] = useState(true);
  const [recruiterStackMode, setRecruiterStackMode] = useState(false);
  const [desktopTime, setDesktopTime] = useState(() => new Date());
  const [audioVolume, setAudioVolume] = useState(() => {
    const saved = Number(window.localStorage.getItem(AUDIO_VOLUME_KEY));
    return Number.isFinite(saved) ? Math.min(1, Math.max(0, saved)) : 0.18;
  });
  const [audioMuted, setAudioMuted] = useState(
    () => window.localStorage.getItem(AUDIO_MUTED_KEY) === "true"
  );
  const [audioPlaying, setAudioPlaying] = useState(() => {
    const saved = window.localStorage.getItem(AUDIO_PLAYING_KEY);
    return saved === null ? true : saved === "true";
  });
  const [audioAutoplayBlocked, setAudioAutoplayBlocked] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => {
    const saved = Number(window.localStorage.getItem(AUDIO_TRACK_KEY));
    if (!Number.isFinite(saved)) return 0;
    return Math.min(Math.max(0, saved), Math.max(playlist.length - 1, 0));
  });
  const [musicWidgetPosition, setMusicWidgetPosition] = useState(() => {
    const saved = window.localStorage.getItem(AUDIO_WIDGET_POS_KEY);
    if (!saved) {
      return { top: 14, right: 108 };
    }

    try {
      const parsed = JSON.parse(saved);
      if (
        typeof parsed?.top === "number" &&
        typeof parsed?.right === "number"
      ) {
        return parsed;
      }
    } catch {
      return { top: 14, right: 108 };
    }

    return { top: 14, right: 108 };
  });
  const [isDraggingMusicWidget, setIsDraggingMusicWidget] = useState(false);

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
    const timer = window.setInterval(() => setDesktopTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(AUDIO_VOLUME_KEY, String(audioVolume));
  }, [audioVolume]);

  useEffect(() => {
    window.localStorage.setItem(AUDIO_MUTED_KEY, String(audioMuted));
  }, [audioMuted]);

  useEffect(() => {
    window.localStorage.setItem(AUDIO_PLAYING_KEY, String(audioPlaying));
  }, [audioPlaying]);

  useEffect(() => {
    window.localStorage.setItem(AUDIO_TRACK_KEY, String(currentTrackIndex));
  }, [currentTrackIndex]);

  useEffect(() => {
    window.localStorage.setItem(
      AUDIO_WIDGET_POS_KEY,
      JSON.stringify(musicWidgetPosition)
    );
  }, [musicWidgetPosition]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = audioVolume;
  }, [audioVolume]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = audioMuted;
  }, [audioMuted]);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.load();

    if (!audioPlaying) {
      audioRef.current.pause();
      return;
    }

    const playPromise = audioRef.current.play();
    if (playPromise?.catch) {
      playPromise
        .then(() => {
          setAudioAutoplayBlocked(false);
        })
        .catch(() => {
          setAudioAutoplayBlocked(true);
        });
    } else {
      setAudioAutoplayBlocked(false);
    }
  }, [audioPlaying, currentTrackIndex]);

  useEffect(() => {
    if (!audioPlaying || !audioAutoplayBlocked) return undefined;

    const resumeAudio = () => {
      if (!audioRef.current) return;

      const retryPromise = audioRef.current.play();
      if (retryPromise?.catch) {
        retryPromise
          .then(() => {
            setAudioAutoplayBlocked(false);
          })
          .catch(() => {
            return;
          });
      } else {
        setAudioAutoplayBlocked(false);
      }
    };

    window.addEventListener("pointerdown", resumeAudio, { once: true });
    window.addEventListener("keydown", resumeAudio, { once: true });
    window.addEventListener("touchstart", resumeAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", resumeAudio);
      window.removeEventListener("keydown", resumeAudio);
      window.removeEventListener("touchstart", resumeAudio);
    };
  }, [audioPlaying, audioAutoplayBlocked]);

  useEffect(() => {
    if (!audioPlaying) {
      setAudioAutoplayBlocked(false);
    }
  }, [audioPlaying]);

  useEffect(() => {
    if (!audioRef.current) return undefined;

    const handleEnded = () => {
      setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    };

    audioRef.current.addEventListener("ended", handleEnded);
    return () => {
      audioRef.current?.removeEventListener("ended", handleEnded);
    };
  }, [playlist.length]);

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
        if (isMobile && !recruiterStackMode) {
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
  }, [viewport, openWindows, taskbarHeight, isMobile, recruiterStackMode]);

  // const taskbarHeight = isMobile
  //  ? MOBILE_TASKBAR_HEIGHT
  //  : DESKTOP_TASKBAR_HEIGHT;

  useEffect(() => {
    if (!isRecruiterMode) return;

    const preset = computeRecruiterPreset(
      window.innerWidth,
      window.innerHeight,
      taskbarHeight,
      viewport
    );

    setOpenWindows(preset.open);
    setActiveWindow(preset.active);
    setWinState(
      Object.fromEntries(
        preset.open.map((id) => [id, { minimized: false, maximized: false }])
      )
    );
    setFrames(preset.frames);
    setRecruiterStackMode(preset.mobileStack);
    setHasShownPreset(true);
  }, [isRecruiterMode, taskbarHeight, viewport]);

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

  const applyRecruiterLayout = () => {
    const preset = computeRecruiterPreset(
      window.innerWidth,
      window.innerHeight,
      taskbarHeight,
      viewport
    );

    setOpenWindows(preset.open);
    setActiveWindow(preset.active);
    setWinState(
      Object.fromEntries(
        preset.open.map((id) => [id, { minimized: false, maximized: false }])
      )
    );
    setFrames(preset.frames);
    setRecruiterStackMode(preset.mobileStack);
    setHasShownPreset(true);
  };

  const openWindow = (windowId) => {
    setContextMenu(null);
    setSelectedIcon(windowId);

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

      const preset = computeRecruiterPreset(
        window.innerWidth,
        window.innerHeight,
        taskbarHeight,
        viewport
      );

      setOpenWindows(preset.open);
      setActiveWindow(preset.active);

      const nextState = {};
      for (const id of preset.open) {
        nextState[id] = { minimized: false, maximized: false };
      }

      setWinState(nextState);
      setFrames(preset.frames);
      setRecruiterStackMode(preset.mobileStack);
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
  const seconds = desktopTime.getSeconds();
  const minutes = desktopTime.getMinutes();
  const hours = desktopTime.getHours() % 12;
  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = hours * 30 + minutes * 0.5;
  const clockNumbers = Array.from({ length: 12 }, (_, index) => {
    const value = index + 1;
    const angle = value * 30;

    return {
      value,
      x: 50 + Math.sin((angle * Math.PI) / 180) * 38,
      y: 50 - Math.cos((angle * Math.PI) / 180) * 38,
    };
  });

  const assistantItems = [
    {
      id: "dashboard",
      title: "Start Here",
      body: "Fast recruiter overview, role fit, and direct actions."
    },
    {
      id: "projects",
      title: "See Proof",
      body: "AWS analytics, public transport API, AI systems, and geospatial work."
    },
    {
      id: "experience",
      title: "Work History",
      body: "Research assistant, operations support, and SAIEP project experience."
    },
    {
      id: "contact",
      title: "Contact",
      body: "Email, LinkedIn, GitHub, and message form."
    }
  ];

  const currentTrack = playlist[currentTrackIndex] ?? playlist[0];
  const VolumeIcon =
    audioMuted || audioVolume === 0
      ? VolumeX
      : audioVolume < 0.5
        ? Volume1
        : Volume2;

  const handleToggleAudioPlayback = () => {
    setAudioPlaying((prev) => !prev);
  };

  const handleVolumeChange = (nextVolume) => {
    setAudioVolume(nextVolume);
    if (nextVolume > 0 && audioMuted) {
      setAudioMuted(false);
    }
  };

  const handleToggleMute = () => {
    setAudioMuted((prev) => !prev);
  };

  useEffect(() => {
    if (!isDraggingMusicWidget) return undefined;

    const handlePointerMove = (event) => {
      const nextLeft = event.clientX - dragOffsetRef.current.x;
      const nextTop = event.clientY - dragOffsetRef.current.y;
      const widgetWidth = isMobile ? 220 : 236;
      const maxLeft = Math.max(8, window.innerWidth - widgetWidth - 8);
      const maxTop = Math.max(8, window.innerHeight - taskbarHeight - 140);
      const clampedLeft = Math.min(Math.max(8, nextLeft), maxLeft);
      const clampedTop = Math.min(Math.max(8, nextTop), maxTop);

      setMusicWidgetPosition({
        top: clampedTop,
        right: Math.max(8, window.innerWidth - clampedLeft - widgetWidth),
      });
    };

    const handlePointerUp = () => {
      setIsDraggingMusicWidget(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDraggingMusicWidget, isMobile, taskbarHeight]);


  const renderWindows = () =>
    openWindows.map((windowId, index) => {
      const iconData = desktopIcons.find((icon) => icon.id === windowId);
      if (!iconData) return null;

      const state = winState[windowId] ?? {
        minimized: false,
        maximized: false,
      };

      if (state.minimized) return null;
      if (isMobile && !recruiterStackMode && activeWindow !== windowId) return null;

      const frame = frames[windowId] ?? {
        x: 100 + index * 30,
        y: 80 + index * 30,
        w: 600,
        h: 500,
      };

      const WindowComponent = iconData.component;

      return (
        <Window
          key={windowId}
          title={iconData.label}
          isActive={activeWindow === windowId}
          isMinimized={state.minimized}
          isMaximized={state.maximized}
          isMobile={isMobile && !recruiterStackMode}
          isStackedMobile={isMobile && recruiterStackMode}
          taskbarHeight={taskbarHeight}
          onClose={() => closeWindow(windowId)}
          onFocus={() => focusWindow(windowId)}
          onMinimize={() => minimizeWindow(windowId)}
          onToggleMaximize={() => toggleMaximize(windowId)}
          initialPosition={{ x: frame.x, y: frame.y }}
          initialSize={{ w: frame.w, h: frame.h }}
          titleIconSrc={iconData.iconSrc}
        >
          <Suspense fallback={<div className={styles.loadingWindow}>Loading...</div>}>
            <WindowComponent onOpen={openWindow} />
          </Suspense>
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
            <div className={`flex flex-col items-center px-1 py-1 rounded-md hover:bg-white/15 active:bg-white/20 transition ${selectedIcon === icon.id ? "bg-white/20 outline outline-1 outline-white/40" : ""}`}>
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

      {contextMenu && (
        <div
          className={styles.contextMenu}
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onMouseLeave={() => setContextMenu(null)}
        >
          <button type="button" onClick={applyRecruiterLayout}>
            Open Recruiter Layout
          </button>
          <button type="button" onClick={() => openWindow("dashboard")}>
            Open Dashboard
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedIcon(null);
              setContextMenu(null);
            }}
          >
            Refresh Desktop
          </button>
        </div>
      )}

      <div className={styles.analogClock} data-desktop-context="ignore" title="System clock">
        <div className={styles.clockFace}>
          {clockNumbers.map((number) => (
            <span
              key={number.value}
              className={styles.clockNumber}
              style={{
                left: `${number.x}%`,
                top: `${number.y}%`,
              }}
            >
              {number.value}
            </span>
          ))}
          <span
            className={`${styles.clockHand} ${styles.clockHour}`}
            style={{ transform: `translateX(-50%) rotate(${hourAngle}deg)` }}
          />
          <span
            className={`${styles.clockHand} ${styles.clockMinute}`}
            style={{ transform: `translateX(-50%) rotate(${minuteAngle}deg)` }}
          />
          <span
            className={`${styles.clockHand} ${styles.clockSecond}`}
            style={{ transform: `translateX(-50%) rotate(${secondAngle}deg)` }}
          />
          <span className={styles.clockPin} />
        </div>
      </div>

      <div
        className={`${styles.musicWidget} ${
          isDraggingMusicWidget ? styles.musicWidgetDragging : ""
        }`}
        data-desktop-context="ignore"
        style={{
          top: `${musicWidgetPosition.top}px`,
          right: `${musicWidgetPosition.right}px`,
        }}
      >
        <div
          className={styles.musicWidgetHeader}
          onPointerDown={(event) => {
            const bounds = event.currentTarget.parentElement?.getBoundingClientRect();
            if (!bounds) return;

            dragOffsetRef.current = {
              x: event.clientX - bounds.left,
              y: event.clientY - bounds.top,
            };
            setIsDraggingMusicWidget(true);
          }}
        >
          <span>Now Playing</span>
        </div>

        <div className={styles.musicWidgetBody}>
          <div
            className={`${styles.musicRecord} ${
              audioPlaying ? styles.musicRecordSpinning : ""
            }`}
            aria-hidden="true"
          >
            <span className={styles.musicRecordCenter} />
          </div>

          <div className={styles.musicMeta}>
            <strong>{currentTrack.title}</strong>
          </div>
        </div>

        <div className={styles.musicControls}>
          <button
            type="button"
            className={`${styles.musicControlButton} ${styles.musicControlPrimary}`}
            onClick={handleToggleAudioPlayback}
            title={audioPlaying ? "Pause music" : "Play music"}
          >
            {audioPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            type="button"
            className={styles.musicControlButton}
            onClick={handleToggleMute}
            title={audioMuted || audioVolume === 0 ? "Unmute" : "Mute"}
          >
            <VolumeIcon size={14} />
          </button>
        </div>

        <label className={styles.musicSliderGroup}>
          <span>Volume</span>
          <input
            className={styles.musicSlider}
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={audioVolume}
            onChange={(event) => handleVolumeChange(Number(event.target.value))}
          />
        </label>

      </div>

      <div
        className={`${styles.assistant} ${assistantOpen ? styles.assistantOpen : styles.assistantClosed}`}
        data-desktop-context="ignore"
      >
        <button
          type="button"
          className={styles.assistantToggle}
          onClick={() => setAssistantOpen((prev) => !prev)}
          title={assistantOpen ? "Hide assistant" : "Show assistant"}
        >
          <img src={assistantIcon} alt="" className={styles.assistantToggleIcon} draggable="false" />
        </button>

        {assistantOpen && (
          <div className={styles.assistantBody}>
            <div className={styles.assistantHeader}>
              <img src={assistantIcon} alt="" draggable="false" />
              <div>
                <strong>Portfolio Assistant</strong>
                <span>Pick a route</span>
              </div>
            </div>

            <div className={styles.assistantList}>
              {assistantItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={styles.assistantItem}
                  onClick={() => openWindow(item.id)}
                >
                  <span>{item.title}</span>
                  <small>{item.body}</small>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {renderWindows()}

      <Taskbar
        onLogout={onLogout}
        openWindows={taskbarWindows}
        activeWindow={activeWindow}
        onWindowClick={handleTaskbarClick}
        isMobile={false}
        shortcuts={desktopIcons}
        onShortcutClick={openWindow}
        onOpenAll={applyRecruiterLayout}
        profileImage={ASSETS.images.profile}
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
        shortcuts={desktopIcons}
        onShortcutClick={openWindow}
        onOpenAll={applyRecruiterLayout}
        profileImage={ASSETS.images.profile}
      />
    </>
  );

  return (
    <div
      className={`h-screen w-screen relative bg-black ${recruiterStackMode ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden"}`}
      onClick={() => setContextMenu(null)}
      onContextMenu={(event) => {
        if (event.target?.closest?.('[data-desktop-context="ignore"]')) return;
        event.preventDefault();
        setContextMenu({
          x: Math.min(event.clientX, window.innerWidth - 220),
          y: Math.min(event.clientY, window.innerHeight - taskbarHeight - 150),
        });
      }}
    >
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="auto"
      />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />
      {isMobile ? renderMobileShell() : renderDesktopShell()}
    </div>
  );
}
