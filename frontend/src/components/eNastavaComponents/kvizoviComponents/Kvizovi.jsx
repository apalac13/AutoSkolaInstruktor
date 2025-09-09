"use client";
import Link from "next/link";
import axios from "axios";
import clsx from "clsx";

export default function Kvizovi({ user, quizes, setQuizes }) {
  const deleteQuiz = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/e-nastava/kvizovi/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setQuizes(quizes.filter((q) => q._id !== id));
    } catch (error) {
      console.error(
        "Error deleting quiz",
        error.response?.data || error.message
      );
      alert("There was an error deleting the quiz.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-around border-b-[1px] border-black-40 text-base font-semibold ">
        <p>IME KVIZA</p>
        <p>OPIS</p>
        <p>OPCIJE</p>
      </div>
      {quizes.map((quiz) => (
        <div
          key={quiz._id}
          className=" grid grid-cols-3 gap-4 p-6  border-b-[1px] border-black-40 text-base"
        >
          <p>{quiz.quizname}</p>
          <p>{quiz.quizdescription}</p>
          <div className=" flex flex-wrap  gap-3">
            <Link
              href={`/e-nastava/kvizovi/${quiz._id}/pogledaj`}
              className={clsx(user.role === "admin" ? "visible" : "hidden")}
            >
              <button className="w-[100px] h-10 border border-black-40 bg-black-40 ">
                <p className=" text-white-60 text-xs font-light text-center ">
                  POGLEDAJ
                </p>
              </button>
            </Link>
            <Link
              href={`/e-nastava/kvizovi/${quiz._id}/dodaj-pitanje`}
              className={clsx(user.role === "admin" ? "visible" : "hidden")}
            >
              <button className="w-[100px] h-10 border border-black-40 bg-black-40 ">
                <p className=" text-white-60 text-xs font-light text-center ">
                  DODAJ
                </p>
              </button>
            </Link>
            <Link href={`/e-nastava/kvizovi/${quiz._id}`}>
              <button className="w-[100px] h-10 border border-green-80 bg-green-80 ">
                <p className=" text-white-60 text-xs font-light text-center ">
                  IGRAJ
                </p>
              </button>
            </Link>
            {user.role === "admin" && (
              <button
                onClick={() => deleteQuiz(quiz._id)}
                className="w-[100px] h-10 border border-red-70 bg-red-70 "
              >
                <p className="text-white-60 text-xs font-light text-center ">
                  IZBRIŠI
                </p>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
