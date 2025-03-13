"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import Chat from "@/components/eNastavaComponents/chatComponents/Chat";

export default function ChatPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
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
      setUser(decodedToken.name);
    } catch (error) {
      console.error("Invalid token", error);
      router.push("/e-nastava");
      return;
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center mb-28">
      <SubNavigacija />
      <Chat user={user} />
    </div>
  );
}
