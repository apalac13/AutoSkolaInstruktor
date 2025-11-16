"use client";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Notification from "@/components/Notification";
import RegisterUser from "@/components/eNastavaComponents/kandidatiComponents/RegisterUser";
import Users from "@/components/eNastavaComponents/kandidatiComponents/Users";
import { AuthContext } from "@/context/AuthContext";

export default function KandidatiPage() {
  const [users, setUsers] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const resetMessageWithTimeout = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/e-nastava");
      return;
    }

    if (user.role !== "admin") {
      router.replace("/e-nastava/testovi");
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3003/e-nastava/kandidati", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((error) => {
        resetMessageWithTimeout(
          error.response?.data?.message ||
            "Greška prilikom dohvaćanja kandidata.",
          "error"
        );
      });
  }, [loading, user, router]);

  if (loading || !user || user.role !== "admin") {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <SubNavigacija />
      <div className="flex flex-col gap-16">
        <Notification message={message} messageType={messageType} />
        <RegisterUser users={users} setUsers={setUsers} />
        <Users users={users} setUsers={setUsers} />
      </div>
    </div>
  );
}
