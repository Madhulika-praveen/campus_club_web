import "./App.css";
import { useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import RoleSelection from "./pages/RoleSelection";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [selectedRole, setSelectedRole] = useState(null);

  const handleLogin = () => setLoggedIn(true);

  if (loggedIn) {
    return <Home />;
  }

  if (!selectedRole) {
    return <RoleSelection onSelectRole={setSelectedRole} />;
  }

  if (selectedRole === "student") {
    return (
      <Login
        onLogin={handleLogin}
        onBack={() => setSelectedRole(null)}
      />
    );
  }

  return (
    <div>
      <button onClick={() => setSelectedRole(null)}>
        ← Back to role selection
      </button>
      <h2>
        {selectedRole === "organizer" ? "Organizer" : "Faculty"} Login
      </h2>
      <p>This login will be implemented in a later phase.</p>
    </div>
  );
}

export default App;
