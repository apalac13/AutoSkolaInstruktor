"use client";
import axios from "axios";
import Link from "next/link";

export default function QuizResult({
  quizesResults,
  quizResult,
  setQuizesResults,
}) {
  const deleteQuizResult = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3003/e-nastava/rezultati/kviz/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setQuizesResults(quizesResults.filter((q) => q._id !== id));
    } catch (error) {
      console.error(
        "Error deleting quiz",
        error.response?.data || error.message
      );
      alert("There was an error deleting the quiz.");
    }
  };
  return (
    <div className="grid grid-cols-4 gap-4 p-6  border-b-[1px] border-black-40 text-base">
      <p>{quizResult.name}</p>
      <p>{quizResult.quiz.quizname}</p>
      <p>
        {quizResult.result}
        <span>%</span>{" "}
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href={`/e-nastava/rezultati/kviz/${quizResult._id}`}>
          <button className="w-[100px] h-10 border border-black-40 bg-black-40 ">
            <p className=" text-white-60 text-xs font-light text-center ">
              POGLEDAJ
            </p>
          </button>
        </Link>
        <button
          onClick={() => deleteQuizResult(quizResult._id)}
          className="w-[100px] h-10 border border-red-70 bg-red-70 "
        >
          <p className=" text-white-60 text-xs font-light text-center ">
            IZBRIŠI
          </p>
        </button>
      </div>
    </div>
  );
}
