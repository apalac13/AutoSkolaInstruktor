"use client";
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setLoading(false);
        return;
      }

      setUser({
        name: decodedToken.name || "",
        username: decodedToken.username || "",
        role: decodedToken.role || role || "",
      });
    } catch (error) {
      console.error("Invalid token", error);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
