"use client";
import Section from "@/components/Section";
import { useState, useEffect } from "react";
import axios from "axios";
import QuizResult from "./QuizResult";
import Notification from "@/components/Notification";

export default function QuizesResults({ user }) {
  const [quizesResults, setQuizesResults] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const resetMessageWithTimeout = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/e-nastava/rezultati/kvizovi`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const allResults = res.data;
        const filteredResults =
          user?.role === "admin"
            ? allResults
            : allResults.filter((r) => r?.username === user?.username);

        setQuizesResults(filteredResults);
      })
      .catch((error) => {
        resetMessageWithTimeout(
          error.response?.data?.message ||
            "Greška prilikom dohvaćanja rezultata.",
          "error"
        );
      });
  }, [user]);

  return (
    <div className="flex flex-col gap-11">
      <Notification message={message} messageType={messageType} />
      <Section number={"02"} text={"REZULTATI KVIZOVA"} />
      <div className="flex flex-col">
        <div className="flex justify-around border-b-[1px] border-black-40 text-base font-semibold ">
          <p>KANDIDAT</p>
          <p>KVIZ</p>
          <p>REZULTAT</p>
          <p>OPCIJE</p>
        </div>
        {quizesResults.length > 0 ? (
          quizesResults.map((quizResult) => (
            <QuizResult
              key={quizResult._id}
              user={user}
              quizesResults={quizesResults}
              quizResult={quizResult}
              setQuizesResults={setQuizesResults}
            />
          ))
        ) : (
          <p className="text-center mt-4 text-gray-600">
            Nema dostupnih rezultata.
          </p>
        )}
      </div>
    </div>
  );
}
