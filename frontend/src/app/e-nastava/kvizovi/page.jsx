"use client";
import Kvizovi from "@/components/eNastavaComponents/kvizoviComponents/Kvizovi";
import NapraviKviz from "@/components/eNastavaComponents/kvizoviComponents/NapraviKviz";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Notification from "@/components/Notification";

export default function KvizoviPage() {
  const [quizes, setQuizes] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const resetMessageWithTimeout = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/e-nastava/kvizovi`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setQuizes(res.data))
      .catch((error) => {
        resetMessageWithTimeout(
          error.response?.data?.message ||
            "Greška prilikom dohvaćanja kvizova.",
          "error"
        );
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <SubNavigacija />
      <div className="flex flex-col gap-16">
        <Notification message={message} messageType={messageType} />
        {user.role === "admin" && (
          <NapraviKviz quizes={quizes} setQuizes={setQuizes} />
        )}
        <Kvizovi user={user} quizes={quizes} setQuizes={setQuizes} />
      </div>
    </div>
  );
}
