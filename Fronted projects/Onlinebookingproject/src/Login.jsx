import React, { useState } from "react";
import { loginUser } from "./api";

const Login = ({ setUser, setPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });
      const userData = response.data;

      // Save user in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      // Redirect based on role
      if (userData.role === "admin") {
        setPage("adminDashboard");
      } else {
        setPage("userDashboard");
      }
    } catch (err) {
      setError("Invalid login credentials");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => setPage("register")} style={{ marginLeft: "10px" }}>
        Register
      </button>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
