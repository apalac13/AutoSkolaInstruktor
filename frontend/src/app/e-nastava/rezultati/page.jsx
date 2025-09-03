"use client";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import QuizesResults from "@/components/eNastavaComponents/rezultatiComponents/QuizesResults";
import TestsResults from "@/components/eNastavaComponents/rezultatiComponents/TestsResults";

export default function KvizoviPage() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center mb-28">
      <SubNavigacija />
      <div className="flex flex-col gap-24">
        <TestsResults />
        <QuizesResults />
      </div>
    </div>
  );
}
