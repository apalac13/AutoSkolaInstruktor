"use client";
import Link from "next/link";
import axios from "axios";
import clsx from "clsx";
import EButton from "@/components/buttons/EButton";
import Notification from "@/components/Notification";
import { useState } from "react";

export default function Kvizovi({ user, quizes, setQuizes }) {
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const resetMessageWithTimeout = (message, type = "success") => {
    setMessage(message);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };

  const deleteQuiz = async (id) => {
    if (!window.confirm("Jeste li sigurni da želite izbrisati kviz")) return;
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/e-nastava/kvizovi/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setQuizes(quizes.filter((q) => q._id !== id));
      const message = response.data.message;
      if (message) resetMessageWithTimeout(message, "success");
    } catch (error) {
      resetMessageWithTimeout(
        error.response?.data?.message || "Greška pri brisanju kviza.",
        "error"
      );
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-around border-b-[1px] border-black-40 text-base font-semibold ">
        <p>IME KVIZA</p>
        <p>OPIS</p>
        <p>OPCIJE</p>
      </div>
      <Notification message={message} messageType={messageType} />
      {quizes && quizes.length > 0 ? (
        quizes.map((quiz) => (
          <div
            key={quiz._id}
            className=" grid grid-cols-3 gap-4 p-6  border-b-[1px] border-black-40 text-base"
          >
            <p>{quiz.quizname}</p>
            <p>{quiz.quizdescription}</p>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
              <Link
                href={`/e-nastava/kvizovi/${quiz._id}/pogledaj`}
                className={clsx(user.role === "admin" ? "visible" : "hidden")}
              >
                <EButton
                  type={"button"}
                  width={"100px"}
                  text={"POGLEDAJ"}
                  color={"black"}
                />
              </Link>
              <Link
                href={`/e-nastava/kvizovi/${quiz._id}/dodaj-pitanje`}
                className={clsx(user.role === "admin" ? "visible" : "hidden")}
              >
                <EButton
                  type={"button"}
                  width={"100px"}
                  text={"DODAJ"}
                  color={"black"}
                />
              </Link>
              <Link href={`/e-nastava/kvizovi/${quiz._id}`}>
                <EButton
                  type={"button"}
                  width={"100px"}
                  text={"IGRAJ"}
                  color={"green"}
                />
              </Link>
              {user.role === "admin" && (
                <div>
                  <button
                    onClick={() => deleteQuiz(quiz._id)}
                    className="relative group w-[100px] h-10 border-red-71 bg-red-71 "
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#DA291C,#231F20)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out"></div>
                    <span className="relative text-white-60 text-xs text-center font-light">
                      IZBRIŠI
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center mt-4 text-gray-600">
          Nema dostupnih kvizova.
        </p>
      )}
    </div>
  );
}
