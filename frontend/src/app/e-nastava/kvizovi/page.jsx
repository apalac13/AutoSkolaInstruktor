"use client";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import Kvizovi from "@/components/eNastavaComponents/kvizoviComponents/Kvizovi";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function KvizoviPage() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center mb-28">
      <SubNavigacija />
      <Kvizovi />
    </div>
  );
}
