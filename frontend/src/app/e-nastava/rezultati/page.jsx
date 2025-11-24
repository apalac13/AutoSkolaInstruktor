"use client";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import QuizesResults from "@/components/eNastavaComponents/rezultatiComponents/QuizesResults";
import TestsResults from "@/components/eNastavaComponents/rezultatiComponents/TestsResults";

export default function RezultatiPage() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <SubNavigacija />
      <div className="flex flex-col gap-24 w-full">
        <TestsResults user={user} />
        <QuizesResults user={user} />
      </div>
    </div>
  );
}
