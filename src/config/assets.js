const ASSET_BASE =
    import.meta.env.VITE_ASSET_BASE || "https://assets.hrithikjadhav.com";

export const ASSETS = {
    icons: {
        myComputer: `${ASSET_BASE}/icons/desktop/Mycomputer-3.png`,
        documents: `${ASSET_BASE}/icons/desktop/books.png`,
        resume: `${ASSET_BASE}/icons/desktop/logviewer.png`,
        technical: `${ASSET_BASE}/icons/desktop/technical.png`,
        explorer: `${ASSET_BASE}/icons/desktop/explorer.png`,
        briefcase: `${ASSET_BASE}/icons/desktop/briefcase.png`,
        monitor: `${ASSET_BASE}/icons/desktop/utilities-system-monitor.png`,
        terminal: `${ASSET_BASE}/icons/desktop/utilities-terminal.png`,
        dashboard: `${ASSET_BASE}/icons/desktop/cs-applets.png`,
        windowsLogo: `${ASSET_BASE}/icons/desktop/windows-logo.webp`,
        startHere: `${ASSET_BASE}/portfolio-assets/icons/desktop/start-here.png`
    },

    images: {
        wallpaper: `${ASSET_BASE}/images/wallpaper/wallpaper4.webp`,
        profile: `${ASSET_BASE}/images/profile/profile_pic2.webp`
    },

    docs: {
        resume: `${ASSET_BASE}/docs/resume/Hrithik_Jadhav_Resume.pdf`
    },

    audio: {
        playlist: [
            {
                id: "playing-your-memories",
                title: "Playing Your Memories",
                src: `${ASSET_BASE}/audio/background/dreamcore-main.mp3`
            }
        ]
    }
};
