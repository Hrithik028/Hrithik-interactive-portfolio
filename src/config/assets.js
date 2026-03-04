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
        windowsLogo: `${ASSET_BASE}/icons/desktop/windows-logo.webp`
    },

    images: {
        wallpaper: `${ASSET_BASE}/images/wallpaper/wallpaper4.webp`,
        profile: `${ASSET_BASE}/images/profile/profile_pic2.webp`
    },

    docs: {
        resume: `${ASSET_BASE}/docs/Hrithik_Jadhav_Resume.pdf`
    }
};