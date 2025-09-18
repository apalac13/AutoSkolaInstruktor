"use client";
import Section from "@/components/Section";
import { useState, useEffect } from "react";
import axios from "axios";
import QuizResult from "./QuizResult";
import Notification from "@/components/Notification";

export default function QuizesResults() {
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
      .get(`http://localhost:3003/e-nastava/rezultati/kvizovi`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setQuizesResults(res.data))
      .catch((error) => {
        resetMessageWithTimeout(
          error.response?.data?.message ||
            "Greška prilikom dohvaćanja rezultata.",
          "error"
        );
      });
  }, []);

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
        {quizesResults.map((quizResult) => (
          <QuizResult
            key={quizResult._id}
            quizesResults={quizesResults}
            quizResult={quizResult}
            setQuizesResults={setQuizesResults}
          />
        ))}
      </div>
    </div>
  );
}
