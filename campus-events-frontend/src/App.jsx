import { useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogin = () => setLoggedIn(true);

  if (!loggedIn) return <Login onLogin={handleLogin} />;

  return <CreateEvent />;
}

export default App;