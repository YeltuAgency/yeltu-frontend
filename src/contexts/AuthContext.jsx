import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("yeltu_admin_token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      // In future you can call /me to verify token
      setAdmin({ email: "admin@yeltu.com" }); 
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const jwt = res.data.token;
      setToken(jwt);
      localStorage.setItem("yeltu_admin_token", jwt);
      setAdmin({ email });
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, message: err.response?.data?.error || "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem("yeltu_admin_token");
  };

  return (
    <AuthContext.Provider value={{ admin, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
