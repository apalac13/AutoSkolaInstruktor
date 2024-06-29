"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Pocetna() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/e-nastava");
    }
  }, [router]);

  return (
    <div>
      <h1>Welcome to Pocetna</h1>
      {/* Content for pocetna */}
    </div>
  );
}
