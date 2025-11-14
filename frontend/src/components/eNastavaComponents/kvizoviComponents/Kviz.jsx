"use client";
import axios from "axios";
import Questions from "@/components/eNastavaComponents/testoviComponents/Questions";
import { motion } from "framer-motion";

export default function Kviz({
  quiz,
  user,
  userAnswers,
  setUserAnswers,
  setFinish,
  result,
  setResult,
  kvizId,
  resetMessageWithTimeout,
}) {
  const handleChange = (questionNumber, answerOption, isText = false) => {
    setUserAnswers((prev) => {
      const idx = prev.findIndex((a) => a.questionNumber === questionNumber);
      if (idx >= 0) {
        const updated = [...prev];
        let updatedAnswers;

        if (isText) {
          updatedAnswers = [answerOption];
        } else {
          updatedAnswers = updated[idx].answers.includes(answerOption)
            ? updated[idx].answers.filter((ans) => ans !== answerOption)
            : [...updated[idx].answers, answerOption];
        }

        updated[idx] = { questionNumber, answers: updatedAnswers };
        return updated;
      } else {
        return [...prev, { questionNumber, answers: [answerOption] }];
      }
    });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    let score = 0;

    quiz.questions.forEach((question) => {
      const userAnswer = userAnswers.find(
        (a) => a.questionNumber === question.questionNumber
      );

      if (userAnswer) {
        const correctOptions = question.answerOptions
          .filter((opt) => opt.answer)
          .map((opt) => opt.option);

        const isCorrect =
          userAnswer.answers.length === correctOptions.length &&
          userAnswer.answers.every((ans) => correctOptions.includes(ans));

        if (isCorrect) {
          score += 1;
        }
      }
    });

    setResult(score);

    const submissionData = {
      quiz: quiz._id,
      username: user?.username || "Gost",
      email: user?.email || "n/a",
      result: score,
      answers: userAnswers,
    };

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
      alert("Kviz uspješno završen!");
      setFinish(true);
    } catch (error) {
      resetMessageWithTimeout(
        error.response?.data?.message || "Greška pri slanju rezultata.",
        "error"
      );
    }
  };

  return (
    <div className="w-[600px] max-[600px]:w-full flex flex-col items-start justify-center gap-6 ">
      <p className="self-center text-xl text-black-40 uppercase ">
        {quiz.quizname}
      </p>
      <div className="w-full flex flex-col  gap-6">
        {quiz.questions && quiz.questions.length > 0 ? (
          quiz.questions.map((question, index) => (
            <motion.div
              key={question.questionNumber}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Questions
                key={question.questionNumber}
                question={question}
                viewAnswers={false}
                handleChange={handleChange}
                userAnswers={userAnswers}
              />
            </motion.div>
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="w-full h-10 border border-black-40 bg-black-40 mb-1"
      >
        <p className=" text-white-60 text-base   font-light text-center ">
          ZAVRŠI I PREDAJ
        </p>
      </button>
    </div>
  );
}
