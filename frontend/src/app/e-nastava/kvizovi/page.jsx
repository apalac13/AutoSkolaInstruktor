"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function NapraviKviz() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "admin") {
      router.push("/e-nastava");
    }
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        // Token has expired
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        router.push("/e-nastava");
      }
    } catch (error) {
      console.error("Invalid token", error);
      router.push("/e-nastava");
    }
  }, [router]);

  return (
    <div>
      <h1>Welcome to Kvizovi</h1>
      {/* Content for pocetna */}
    </div>
  );
}
