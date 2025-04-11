import React, { useState, useEffect } from "react";
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/home");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const name = isRegistering ? e.target[0].value : "";
    const username = e.target[isRegistering ? 1 : 0].value;
    const password = e.target[isRegistering ? 2 : 1].value;
  
    if (isRegistering) {
      localStorage.setItem("app_user", JSON.stringify({ name, username, password }));
      toast.success("✅ Account created!");
      setIsRegistering(false);
    } else {
      const savedUser = JSON.parse(localStorage.getItem("app_user"));
      if (savedUser?.username === username && savedUser?.password === password) {
        localStorage.setItem("isLoggedIn", "true");
        toast.success("✅ Logged in successfully!");
        navigate("/home");
      } else {
        toast.error("❌ Login failed. Try again.");
      }
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isRegistering ? "Register" : "Login"}</h2>
        
        <form onSubmit={handleSubmit}>
          {isRegistering && <input type="text" placeholder="Full Name" required />}
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">{isRegistering ? "Create Account" : "Login"}</button>
        </form>

        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          {isRegistering ? "Already have an account?" : "New user?"}{" "}
          <span
            style={{ color: "#3b82f6", cursor: "pointer" }}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Login here" : "Register here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
