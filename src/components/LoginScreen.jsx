import { useEffect, useMemo, useState } from "react";
import styles from "./LoginScreen.module.css";
import profilephoto from "../assets/profile_pic2.jpeg";
import xpLogo from "../assets/windows logo.png";
import { ChevronRight } from "lucide-react";

const hints = [
    "Tip: Double-click icons to open windows.",
    "Tip: Try the Recycle Bin for easter eggs.",
    "Tip: Press Enter to log in.",
    "Tip: Your portfolio is an OS now.",
];

export default function LoginScreen({ onLogin }) {
    const [name, setName] = useState("Hrithik");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showSwitch, setShowSwitch] = useState(false);

    // Profile selection shouldn't change the visible name
    const [profileMode, setProfileMode] = useState("Hrithik");

    const hint = useMemo(() => hints[Math.floor(Math.random() * hints.length)], []);

    const handleLogin = () => {
        setError("");

        if (password.trim().toLowerCase() === "admin") {
            setError("Nice try 😄 (Hint: you don’t need a password)");
            return;
        }

        onLogin({ name: name.trim() || "Guest", mode: profileMode });
    };

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "Enter") handleLogin();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, password, profileMode]);

    return (
        <div className={styles.root}>
            <div className={styles.bg} />

            <div className={styles.topBar}>
                <div className={styles.topTitle}>Windows XP</div>
                <div className={styles.topHint}>{hint}</div>
            </div>

            <div className={styles.centerWrap}>
                <div className={styles.split}>
                    {/* Left panel (branding) */}
                    <div className={styles.leftPane}>
                        <div className={styles.brandBlock}>
                            <img
                                src={xpLogo}
                                alt="Windows XP"
                                className={styles.brandLogoImg}
                                draggable="false"
                            />
                        </div>

                        <div className={styles.leftMessage}>
                            Welcome to Hrithik’s Windows XP Style Portfolio
                        </div>
                    </div>

                    {/* Divider */}
                    <div className={styles.divider} aria-hidden="true" />

                    {/* Right panel (your current login card UI) */}
                    <div className={styles.rightPane}>
                        <div className={styles.card}>
                            <div className={styles.avatarTile}>
                                <img src={profilephoto} alt="Hrithik" className={styles.avatarImg} />
                            </div>

                            <div className={styles.nameText}>{name.trim() || "Guest"}</div>

                            <div className={styles.modeText}>
                                Profile: <span className={styles.modeStrong}>{profileMode}</span>
                            </div>

                            <div className={styles.passRow}>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Password (optional)"
                                    className={styles.input}
                                />
                                <button
                                    type="button"
                                    onClick={handleLogin}
                                    className={styles.goBtn}
                                    title="Log On"
                                >
                                    <ChevronRight size={22} color="#fff" />
                                </button>
                            </div>

                            {error ? (
                                <div className={styles.error}>{error}</div>
                            ) : (
                                <div className={styles.helper}>
                                    Press <span className={styles.helperStrong}>Enter</span> to log in.
                                </div>
                            )}

                            <div className={styles.actionRow}>
                                <button
                                    type="button"
                                    onClick={() => setShowSwitch((s) => !s)}
                                    className={`${styles.glassBtn} ${styles.glassA}`}
                                >
                                    Switch User
                                </button>

                                <button
                                    type="button"
                                    onClick={() => onLogin({ name: "Guest", mode: "Guest" })}
                                    className={`${styles.glassBtn} ${styles.glassB}`}
                                >
                                    Guest
                                </button>
                            </div>

                            {showSwitch && (
                                <div className={styles.panel}>
                                    <div className={styles.panelHeader}>Choose profile</div>
                                    <div className={styles.panelBody}>
                                        <div className={styles.panelDesc}>
                                            This doesn’t change your name — it selects a mode (Recruiter / Technical) for routing later.
                                        </div>

                                        <div className={styles.panelGrid}>
                                            {["Hrithik", "Recruiter", "Technical"].map((mode) => (
                                                <button
                                                    key={mode}
                                                    type="button"
                                                    className={styles.panelBtn}
                                                    onClick={() => {
                                                        setProfileMode(mode);
                                                        setShowSwitch(false);
                                                    }}
                                                >
                                                    {mode}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className={styles.userEdit}>
                                <div className={styles.label}>User name</div>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={styles.input}
                                    placeholder="Hrithik"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <div className={styles.bottomText}>Log on to “Hrithik OS”</div>

                <button type="button" className={styles.shutdownBtn} onClick={() => window.location.reload()}>
                    Shut Down
                </button>
            </div>
        </div>
    );
}