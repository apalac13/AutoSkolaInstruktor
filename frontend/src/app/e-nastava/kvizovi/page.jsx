"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import Navigacija from "@/components/Navigacija";
import Kvizovi from "@/components/eNastavaComponents/kvizoviComponents/Kvizovi";

export default function KvizoviPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "admin") {
      router.push("/e-nastava");
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        // Token has expired
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        router.push("/e-nastava");
        return;
      }
    } catch (error) {
      console.error("Invalid token", error);
      router.push("/e-nastava");
      return;
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center mb-28">
    
      <SubNavigacija />
      <Kvizovi />
    </div>
  );
}
