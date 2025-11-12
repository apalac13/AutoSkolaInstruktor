"use client";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Notification from "@/components/Notification";
import RegisterUser from "@/components/eNastavaComponents/kandidatiComponents/RegisterUser";
import Users from "@/components/eNastavaComponents/kandidatiComponents/Users";

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
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    if (decodedToken.role === "admin") {
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
    } else {
      router.push("/e-nastava/testovi");
    }
  }, []);

  if (loading) return <div>Loading...</div>;

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
