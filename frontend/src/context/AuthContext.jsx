"use client";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      setLoading(false);
      router.push("/e-nastava");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        router.push("/e-nastava");
        setLoading(false);
        return;
      }

      setUser({
        name: decodedToken.name || "",
        email: decodedToken.email || "",
        role: decodedToken.role || role || "",
      });
      setLoading(false);
    } catch (error) {
      console.error("Invalid token", error);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setLoading(false);
      router.push("/e-nastava");
      return;
    } finally {
      setLoading(false);
    }
  }, [router]);

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
