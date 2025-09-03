"use client";
import { useRouter, useParams } from "next/navigation";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import { useState, useEffect } from "react";
import axios from "axios";
import Kviz from "@/components/eNastavaComponents/kvizoviComponents/Kviz";
import Rezultat from "@/components/eNastavaComponents/kvizoviComponents/Rezultat";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function KvizPage() {
  const router = useRouter();
  const { kvizId } = useParams();
  const [finish, setFinish] = useState(false);
  const [quiz, setQuiz] = useState({ questions: [] });
  const { user, loading } = useContext(AuthContext);
  const [result, setResult] = useState({
    answers: [],
    result: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3003/e-nastava/kvizovi/${kvizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setQuiz(res.data))
      .catch((err) => console.log(err.message));
  }, [router, kvizId]);

  if (loading) return <div>Loading...</div>;

  const handleAnswerChange = (questionId, selectedOption, correctAnswer) => {
    setResult((prevResult) => {
      const updatedAnswers = prevResult.answers.filter(
        (answer) => answer.questionId !== questionId
      );
      updatedAnswers.push({
        question: questionId,
        selectedOption,
        correctAnswer,
      });
      return {
        ...prevResult,
        answers: updatedAnswers,
      };
    });
  };

  const handleTextAnswerChange = (questionId, answerValue, correctAnswer) => {
    setResult((prevResult) => {
      const updatedAnswers = prevResult.answers.filter(
        (answer) => answer.questionId !== questionId
      );
      updatedAnswers.push({
        question: questionId,
        selectedOption: answerValue,
        correctAnswer,
      });
      return {
        ...prevResult,
        answers: updatedAnswers,
      };
    });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const calculatedResult = result.answers.reduce((acc, answer) => {
      if (answer.selectedOption === answer.correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const submissionData = {
      quiz: kvizId,
      name: user?.name || "Gost",
      email: user?.email || "n/a",
      answers: result.answers,
      result: calculatedResult,
    };

    setResult((prevResult) => ({ ...prevResult, result: calculatedResult }));

    try {
      await axios.post(
        `http://localhost:3003/e-nastava/kvizovi/${kvizId}`,
        submissionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Quiz submitted successfully!");
      setFinish(true);
    } catch (error) {
      console.error("Error submitting quiz", error);
      alert("There was an error submitting the quiz.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <SubNavigacija />
      {!finish ? (
        <Kviz
          quiz={quiz}
          handleAnswerChange={handleAnswerChange}
          handleTextAnswerChange={handleTextAnswerChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <Rezultat result={result} setFinish={setFinish} kvizId={kvizId} />
      )}
    </div>
  );
}
