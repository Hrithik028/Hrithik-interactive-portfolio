import React, { useEffect, useState } from "react";
import styles from "../styles/BootScreen.module.css";

export default function BootScreen({ onComplete }) {
    const steps = [
        "Initializing portfolio.exe",
        "Loading projects",
        "Loading research modules",
        "Authentication: Success",
        "Launching interface"
    ];

    const [visibleSteps, setVisibleSteps] = useState([]);
    const [dots, setDots] = useState("");

    // Step-by-step loading
    useEffect(() => {
        let stepIndex = 0;

        const stepInterval = setInterval(() => {
            if (stepIndex < steps.length) {
                const currentStep = steps[stepIndex];

                if (currentStep) {
                    setVisibleSteps((prev) => [...prev, currentStep]);
                }

                stepIndex++;
            } else {
                clearInterval(stepInterval);

                setTimeout(() => {
                    if (onComplete) onComplete();
                }, 800);
            }
        }, 500);

        return () => clearInterval(stepInterval);
    }, [onComplete]);

    // Animated dots
    useEffect(() => {
        const dotInterval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
        }, 300);

        return () => clearInterval(dotInterval);
    }, []);

    return (
        <div className={styles.backdrop}>
            <div className={styles.panel}>
                <div className={styles.terminal}>
                    <div>[ System Booting ]</div>
                    <br />

                    {visibleSteps.map((step, i) => {
                        if (!step) return null;

                        const showDots =
                            !step.includes("Success") &&
                            step !== "Launching interface";

                        return (
                            <div key={i}>
                                {step}
                                {showDots ? dots : ""}
                            </div>
                        );
                    })}

                    <br />

                    {visibleSteps.length === steps.length && (
                        <div>Welcome.</div>
                    )}

                    <div className={styles.cursor}></div>
                </div>
            </div>
        </div>
    );
}