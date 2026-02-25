import { useEffect, useState } from "react";
import Desktop from "./components/Desktop";
import LoginScreen from "./components/LoginScreen";
import BootScreen from "./components/BootScreen";

const KEY = "xp_session";

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function App() {
  const [session, setSession] = useState(() => {
    const saved = sessionStorage.getItem(KEY);
    return saved ? safeParse(saved) : null;
  });

  // Boot flow state
  const [booted, setBooted] = useState(() => {
    // if user already has a session, don’t show boot again
    return Boolean(session);
  });

  useEffect(() => {
    if (session) {
      sessionStorage.setItem(KEY, JSON.stringify(session));
    } else {
      sessionStorage.removeItem(KEY);
    }
  }, [session]);

  const handleLogin = (payload) => {
    setSession(payload);
    // show boot right after successful login
    setBooted(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(KEY);
    setSession(null);
    // next time user logs in, boot shows again
    setBooted(false);
  };

  // 1) No session -> show Login
  if (!session) return <LoginScreen onLogin={handleLogin} />;

  // 2) Has session but not booted -> show BootScreen, then continue to Desktop
  if (!booted) {
    return (
      <BootScreen
        onComplete={() => setBooted(true)}
        durationMs={1100}
        showOnceKey="bootShownThisSession"
        title="Welcome to Hrithik’s Portfolio"
      />
    );
  }

  // 3) Booted -> show Desktop
  return (
    <div className="min-h-screen">
      <Desktop session={session} onLogout={handleLogout} />
    </div>
  );
}

export default App;