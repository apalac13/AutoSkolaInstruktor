"use client";
import Kvizovi from "@/components/eNastavaComponents/kvizoviComponents/Kvizovi";
import NapraviKviz from "@/components/eNastavaComponents/kvizoviComponents/NapraviKviz";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function KvizoviPage() {
  const [quizes, setQuizes] = useState([]);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3003/e-nastava/kvizovi", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setQuizes(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center mb-28">
      <SubNavigacija />
      <div className="flex flex-col gap-16">
        {user.role === "admin" && (
          <NapraviKviz quizes={quizes} setQuizes={setQuizes} />
        )}
        <Kvizovi user={user} quizes={quizes} setQuizes={setQuizes} />
      </div>
    </div>
  );
}
