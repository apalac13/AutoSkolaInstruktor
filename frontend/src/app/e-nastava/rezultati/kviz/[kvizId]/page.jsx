"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import ResultQuestion from "@/components/eNastavaComponents/rezultatiComponents/ResultQuestion";
import Notification from "@/components/Notification";
import Button from "@/components/buttons/Button";

export default function KvizRezultatDetalji() {
  const { kvizId } = useParams();
  const [quizResult, setQuizResult] = useState({});
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const resetMessageWithTimeout = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3003/e-nastava/rezultati/kviz/${kvizId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setQuizResult(res.data))
      .catch((error) => {
        resetMessageWithTimeout(
          error.response?.data?.message ||
            "Greška prilikom dohvaćanja rezultata.",
          "error"
        );
      });
  }, []);

  return (
    <div className="flex flex-col gap-11 p-5">
      <Notification message={message} messageType={messageType} />
      <div className="flex gap-11 text-lg max-[450px]:text-base ">
        <p>Kandidat: {quizResult.name}</p>
        <div className="flex gap-1">
          <span>Rezultat:</span>
          <span>{quizResult.result}</span>
          <span>/</span>
          <span>{quizResult.quiz?.questions?.length || 0}</span>
        </div>
      </div>
      {quizResult.quiz?.questions?.map((question, index) => {
        const matchedAnswer = quizResult.answers?.find(
          (answer) => answer.questionNumber === question.questionNumber
        );

        return (
          <motion.div
            key={question.questionNumber}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ResultQuestion question={question} testAnswer={matchedAnswer} />
          </motion.div>
        );
      })}
      <Link href={"/e-nastava/rezultati"}>
        <Button
          type={"button"}
          width={"100%"}
          text={"ZAVRŠI PREGLED"}
          color={"black"}
        />
      </Link>
    </div>
  );
}
