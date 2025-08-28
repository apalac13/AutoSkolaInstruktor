"use client";
import { useEffect, useState } from "react";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import Kvizovi from "@/components/eNastavaComponents/pocetnaComponents/Kvizovi";
import Rezultati from "@/components/eNastavaComponents/pocetnaComponents/Rezultati";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function Pocetna() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center mb-28">
      <SubNavigacija />
      <div className="flex flex-col gap-20">
        <Kvizovi />
        <Rezultati />
      </div>
    </div>
  );
}
