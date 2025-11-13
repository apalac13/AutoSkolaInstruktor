"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Notification from "@/components/Notification";
import EButton from "@/components/buttons/EButton";

export default function QuizResult({
  user,
  quizesResults,
  quizResult,
  setQuizesResults,
}) {
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const resetMessageWithTimeout = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };
  const deleteQuizResult = async (id) => {
    if (!window.confirm("Jeste li sigurni da želite izbrisati rezultat?"))
      return;
    try {
      await axios.delete(
        `http://localhost:3003/e-nastava/rezultati/kviz/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setQuizesResults(quizesResults.filter((q) => q._id !== id));
      const message = response.data.message;
      if (message) resetMessageWithTimeout(message, "success");
    } catch (error) {
      resetMessageWithTimeout(
        error.response?.data?.message || "Greška pri brisanju pitanja.",
        "error"
      );
    }
  };
  return (
    <div className="grid grid-cols-4 max-sm:flex max-sm:flex-col max-sm:items-center gap-4 p-6  border-b-[1px] border-black-40 text-base">
      <Notification message={message} messageType={messageType} />
      <p>{quizResult.name}</p>
      <p>{quizResult.quiz.quizname}</p>
      <p>
        <span>{quizResult.result}</span>
        <span>/</span>
        <span>{quizResult.quiz?.questions?.length || 0}</span>
      </p>
      <div className="flex lg:flex-row flex-col  gap-3">
        <Link href={`/e-nastava/rezultati/kviz/${quizResult._id}`}>
          <EButton
            type={"button"}
            width={"100px"}
            text={"POGLEDAJ"}
            color={"black"}
          />
        </Link>
        {user.role === "admin" && (
          <button
            onClick={() => deleteQuizResult(quizResult._id)}
            className="relative group w-[100px] h-10 border-red-71 bg-red-71 "
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#DA291C,#231F20)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out"></div>
            <span className="relative text-white-60 text-xs text-center font-light">
              IZBRIŠI
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
