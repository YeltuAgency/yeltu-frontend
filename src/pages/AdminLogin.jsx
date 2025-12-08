import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AdminLogin() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@yeltu.com"); // for convenience
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await login(email, password);
    if (res.success) {
      navigate("/admin");
    } else {
      setError(res.message || "Invalid credentials");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #0f172a, #1d4ed8)",
        color: "white",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: 360,
          padding: "2rem",
          borderRadius: 12,
          background: "rgba(15, 23, 42, 0.95)",
          boxShadow: "0 25px 50px rgba(15, 23, 42, 0.8)",
        }}
      >
        <h1 style={{ fontSize: 24, marginBottom: "1rem" }}>Yeltu Admin Login</h1>
        <p style={{ fontSize: 14, marginBottom: "1.5rem", color: "#9ca3af" }}>
          Enter your admin credentials to access the dashboard.
        </p>

        {error && (
          <div style={{ marginBottom: 12, fontSize: 14, color: "#fecaca" }}>
            {error}
          </div>
        )}

        <label style={{ display: "block", marginBottom: 8, fontSize: 14 }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #374151",
            marginBottom: 16,
          }}
          required
        />

        <label style={{ display: "block", marginBottom: 8, fontSize: 14 }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #374151",
            marginBottom: 20,
          }}
          required
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 8,
            border: "none",
            background: loading ? "#6b7280" : "linear-gradient(to right, #2563eb, #7c3aed)",
            color: "white",
            cursor: loading ? "default" : "pointer",
            fontWeight: 500,
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
