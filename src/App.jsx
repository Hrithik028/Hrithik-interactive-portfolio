import { useEffect, useState } from "react";
import Desktop from "./components/Desktop";
import LoginScreen from "./components/LoginScreen";

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
    const saved = sessionStorage.getItem("xp_session");
    return saved ? safeParse(saved) : null;
  });

  useEffect(() => {
    if (session) {
      sessionStorage.setItem(KEY, JSON.stringify(session));
    } else {
      sessionStorage.removeItem(KEY);
    }
  }, [session]);

  const handleLogin = (payload) => setSession(payload);

  const handleLogout = () => {
    sessionStorage.removeItem(KEY);
    setSession(null);
  };

  if (!session) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className="min-h-screen">
      {/* Optional: pass session + logout into Desktop later */}
      <Desktop session={session} onLogout={handleLogout} />
      {/* You can add a logout button in Start menu later and call handleLogout */}
    </div>
  );
}

export default App;