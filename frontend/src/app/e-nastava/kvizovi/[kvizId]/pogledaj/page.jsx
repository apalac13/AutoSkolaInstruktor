"use client";
import { useRouter, useParams } from "next/navigation";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import QuizQuestion from "@/components/eNastavaComponents/kvizoviComponents/QuizQuestion";
import Button from "@/components/buttons/Button";

export default function PogledajPage() {
  const router = useRouter();
  const { kvizId } = useParams();
  const [quiz, setQuiz] = useState({ questions: [] });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const resetMessageWithTimeout = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3003/e-nastava/kvizovi/${kvizId}/pogledaj`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setQuiz(res.data))
      .catch((error) => {
        resetMessageWithTimeout(
          error.response?.data?.message || "Greška pri dohvaćanju kviza.",
          "error"
        );
      });
  }, [router, kvizId]);

  const deleteQuestion = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3003/e-nastava/kvizovi/${kvizId}/${id}/pogledaj`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setQuiz(quiz.filter((q) => q._id !== id));
      resetMessageWithTimeout("Pitanje upsješno izbrisano", "success");
    } catch (error) {
      resetMessageWithTimeout(
        error.response?.data?.message || "Greška pri brisanju pitanja.",
        "error"
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <SubNavigacija />
      <div className="w-full flex flex-col items-start justify-center gap-6 ">
        <div className="w-full flex flex-col gap-6 ">
          <p className=" text-xl text-black-40 uppercase ">{quiz.quizname}</p>
          <Link href={"/e-nastava/kvizovi"} className="w-[120px]">
            <Button
              type={"button"}
              width={"150px"}
              text={"ZAVRŠI PREGLED"}
              color={"black"}
            />
          </Link>
          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={clsx(
                "mt-4 p-3 shadow-md uppercase w-full max-w-[500px] text-center",
                {
                  "bg-green-80 text-white-60": messageType === "success",
                  "bg-red-70 text-white-60": messageType === "error",
                }
              )}
            >
              {message}
            </motion.p>
          )}
        </div>
        <div className="w-full flex flex-col  gap-6">
          {quiz.questions && quiz.questions.length > 0 ? (
            quiz.questions.map((question, index) => (
              <QuizQuestion
                key={question._id}
                question={question}
                index={index}
                deleteQuestion={deleteQuestion}
              />
            ))
          ) : (
            <p>No questions available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
