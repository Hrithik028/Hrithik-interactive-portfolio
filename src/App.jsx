import { useEffect, useState } from "react";
import Desktop from "./components/Desktop";
import LoginScreen from "./components/LoginScreen";
import BootScreen from "./components/BootScreen";
import LogoffScreen from "./components/LogoffScreen";

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
  const [loggingOff, setLoggingOff] = useState(false);
  const [booted, setBooted] = useState(() => Boolean(session));

  useEffect(() => {
    if (session) {
      sessionStorage.setItem(KEY, JSON.stringify(session));
    } else {
      sessionStorage.removeItem(KEY);
    }
  }, [session]);

  const handleLogin = (payload) => {
    setSession(payload);
    setBooted(false);
  };

  const handleLogout = () => {
    setLoggingOff(true);
  };

  const finishLogout = () => {
    sessionStorage.removeItem(KEY);
    sessionStorage.removeItem("bootShownThisSession");
    setSession(null);
    setBooted(false);
    setLoggingOff(false);
  };

  if (loggingOff) {
    return <LogoffScreen name={session?.name} onComplete={finishLogout} />;
  }

  if (!session) return <LoginScreen onLogin={handleLogin} />;

  if (!booted) {
    return (
      <div className="min-h-screen">
        <Desktop session={session} onLogout={handleLogout} audioReady={booted} />
        <BootScreen onComplete={() => setBooted(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Desktop session={session} onLogout={handleLogout} audioReady={booted} />
    </div>
  );
}

export default App;
