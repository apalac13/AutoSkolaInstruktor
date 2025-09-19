"use client";
import { useRouter, useParams } from "next/navigation";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import QuizQuestion from "@/components/eNastavaComponents/kvizoviComponents/QuizQuestion";
import Button from "@/components/buttons/Button";
import Notification from "@/components/Notification";

export default function PogledajPage() {
  const router = useRouter();
  const { kvizId } = useParams();
  const [quiz, setQuiz] = useState({});
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
    if (!window.confirm("Jeste li sigurni da želite izbrisati pitanje")) return;
    try {
      const response = await axios.delete(
        `http://localhost:3003/e-nastava/kvizovi/${kvizId}/${id}/pogledaj`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setQuiz((prevQuiz) => ({
        ...prevQuiz,
        questions: prevQuiz.questions.filter((q) => q._id !== id),
      }));
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
    <div className="flex flex-col items-center justify-center">
      <SubNavigacija />
      <div className="w-full flex flex-col items-start justify-center gap-6 ">
        <div className="w-full flex flex-col gap-6 ">
          <p className=" text-xl text-black-40 uppercase ">{quiz.quizname}</p>
          <Notification message={message} messageType={messageType} />
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
        <Link href={"/e-nastava/kvizovi"} className="w-full">
          <Button
            type={"button"}
            width={"100%"}
            text={"ZAVRŠI PREGLED"}
            color={"black"}
          />
        </Link>
      </div>
    </div>
  );
}
