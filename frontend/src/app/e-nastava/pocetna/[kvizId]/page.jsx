"use client";
import { useRouter, useParams } from "next/navigation";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";

export default function KvizPage() {
  const router = useRouter();
  const { kvizId } = useParams();
  const [quiz, setQuiz] = useState({ questions: [] });
  const [result, setResult] = useState({
    answers: [],
    result: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/e-nastava");
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        // Token has expired
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        router.push("/e-nastava");
        return;
      }
    } catch (error) {
      console.error("Invalid token", error);
      router.push("/e-nastava");
      return;
    }

    axios
      .get(`http://localhost:3003/e-nastava/pocetna/${kvizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setQuiz(res.data))
      .catch((err) => console.log(err.message));
  }, [router, kvizId]);

  const handleAnswerChange = (questionId, selectedOption, correctAnswer) => {
    setResult((prevResult) => {
      const updatedAnswers = prevResult.answers.filter(
        (answer) => answer.questionId !== questionId
      );
      updatedAnswers.push({ questionId, selectedOption, correctAnswer });
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
        questionId,
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
    const user = jwtDecode(token).name;

    const calculatedResult = result.answers.reduce((acc, answer) => {
      if (answer.selectedOption === answer.correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const submissionData = {
      quiz: kvizId,
      user,
      answers: result.answers,
      result: calculatedResult,
    };

    try {
      await axios.post(
        `http://localhost:3003/e-nastava/pocetna/${kvizId}`,
        submissionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Quiz submitted successfully!");
      router.push("/e-nastava/pocetna");
    } catch (error) {
      console.error("Error submitting quiz", error);
      alert("There was an error submitting the quiz.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <SubNavigacija />
      <div className="w-[600px] flex flex-col items-start justify-center gap-6 ">
        <p className=" text-xl text-black-40 uppercase ">{quiz.quizname}</p>
        <div className="w-full flex flex-col  gap-6">
          {quiz.questions && quiz.questions.length > 0 ? (
            quiz.questions.map((question, index) => (
              <div
                key={question._id}
                className="flex flex-col gap-6 border-b-[1px] border-black-40 "
              >
                <div className="flex  gap-3 text-lg font-semibold border-b-[1px] border-black-40 ">
                  <p>{index + 1}.</p>
                  <p> {question.questionText}</p>
                </div>
                <div className="flex flex-col gap-3">
                  {question.options && question.options.length > 0 ? (
                    question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="flex items-center gap-3"
                      >
                        <label>
                          <input
                            type="radio"
                            name={`question-${question._id}`}
                            value={option.optionValue}
                            onChange={() =>
                              handleAnswerChange(
                                question._id,
                                option.optionValue,
                                question.answer
                              )
                            }
                          />
                          {option.optionText}
                        </label>
                      </div>
                    ))
                  ) : (
                    <div className="mb-1">
                      <label>
                        <input
                          type="text"
                          name={`question-${question._id}`}
                          className="w-full h-10 border border-black-40 "
                          onChange={(e) =>
                            handleTextAnswerChange(
                              question._id,
                              e.target.value,
                              question.answer
                            )
                          }
                        />
                      </label>
                    </div>
                  )}
                </div>
                {question.image && (
                  <Image
                    src={`/uploads/${question.image}`}
                    alt="..."
                    width={200}
                    height={200}
                  />
                )}
              </div>
            ))
          ) : (
            <p>No questions available.</p>
          )}
        </div>
        <button onClick={handleSubmit}>Submit Quiz</button>
      </div>
    </div>
  );
}
