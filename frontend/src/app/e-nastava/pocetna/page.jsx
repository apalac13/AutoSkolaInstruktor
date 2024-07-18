"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import clsx from "clsx";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import Kvizovi from "@/components/eNastavaComponents/pocetnaComponents/Kvizovi";
import Rezultati from "@/components/eNastavaComponents/pocetnaComponents/Rezultati";

export default function Pocetna() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
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
        return;
      }
    } catch (error) {
      console.error("Invalid token", error);
      router.push("/e-nastava");
      return;
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center">
      <SubNavigacija />
      <Kvizovi />
      <Rezultati />
    </div>
  );
}
