import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Set login flag in localStorage
    localStorage.setItem("isLoggedIn", true);

    // Redirect to Home
    navigate("/home");
  };

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <h2 style={{ marginBottom: "1rem" }}>Login</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "300px" }}>
        <input type="text" placeholder="Username" required style={{ padding: "10px" }} />
        <input type="password" placeholder="Password" required style={{ padding: "10px" }} />
        <button type="submit" style={{ padding: "10px", backgroundColor: "#2563eb", color: "white", border: "none", cursor: "pointer" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
