"use client";

import { useState, useEffect } from "react";
import Questions from "@/components/eNastavaComponents/testoviComponents/Questions";
import EResult from "./EResult";
import { motion } from "framer-motion";
import axios from "axios";

const INITIAL_TIME = 50 * 60;

export default function EAllQuestionView({ test, user }) {
  const [questions, setQuestions] = useState(test.questions);
  const [userAnswers, setUserAnswers] = useState([]);
  const [finalUserAnswers, setFinalUserAnswers] = useState([]);
  const [testOver, setTestOver] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [baseScore, setBaseScore] = useState(0);
  const [replayWrongAnswers, setReplayWrongAnswers] = useState(false);
  const [replay, setReplay] = useState(false);
  const [viewAnswers, setViewAnswers] = useState(false);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [sendResult, setSendResult] = useState(true);

  const correctAnswers = test.questions.length - wrongAnswers.length;

  useEffect(() => {
    if (replay) {
      setScore(0);
      setBaseScore(0);
      setWrongAnswers([]);
      setUserAnswers([]);
      setReplay(false);
      setViewAnswers(false);
      setQuestions(test.questions);
      setTestOver(false);
      setTimeLeft(INITIAL_TIME);
      setSendResult(true);
    }
  }, [replay]);

  useEffect(() => {
    if (replayWrongAnswers) {
      const wrongQuestions = test.questions.filter((q) =>
        wrongAnswers.includes(q.questionNumber)
      );

      let alreadyEarned = 0;
      test.questions.forEach((q) => {
        if (!wrongAnswers.includes(q.questionNumber)) {
          if (q.questionNumber >= 1 && q.questionNumber <= 20) {
            if (test.totalPoints > 10) {
              alreadyEarned += 2;
            } else {
              alreadyEarned += 1;
            }
          } else if (q.questionNumber >= 21 && q.questionNumber <= 30) {
            alreadyEarned += 3;
          } else if (q.questionNumber >= 31 && q.questionNumber <= 40) {
            alreadyEarned += 5;
          }
        }
      });

      setBaseScore(alreadyEarned);
      setScore(alreadyEarned);
      setReplayWrongAnswers(false);
      setViewAnswers(false);
      setUserAnswers([]);
      setQuestions(wrongQuestions);
      setWrongAnswers([]);
      setTestOver(false);
      setTimeLeft(INITIAL_TIME);
      setSendResult(false);
    }
  }, [replayWrongAnswers]);

  useEffect(() => {
    if (viewAnswers) {
      setQuestions(test.questions);
      setTestOver(false);
      setTimeLeft(INITIAL_TIME);
      setSendResult(false);
      setUserAnswers(finalUserAnswers);
    }
  }, [viewAnswers, finalUserAnswers]);

  useEffect(() => {
    if (!testOver && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft <= 0) {
      handleTestOver();
    }
  }, [testOver, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleChange = (questionNumber, answerOption) => {
    setUserAnswers((prev) => {
      const idx = prev.findIndex((a) => a.questionNumber === questionNumber);
      if (idx >= 0) {
        const updated = [...prev];
        const updatedAnswers = updated[idx].answers.includes(answerOption)
          ? updated[idx].answers.filter((ans) => ans !== answerOption)
          : [...updated[idx].answers, answerOption];
        updated[idx] = { questionNumber, answers: updatedAnswers };
        return updated;
      } else {
        return [...prev, { questionNumber, answers: [answerOption] }];
      }
    });
  };

  const handleTestOver = () => {
    if (viewAnswers) {
      setTestOver(true);
      return;
    }

    let earnedThisRound = 0;
    const wrongs = [];

    questions.forEach((q) => {
      const userAnswer = userAnswers.find(
        (ans) => ans.questionNumber === q.questionNumber
      );

      if (!userAnswer) {
        wrongs.push(q.questionNumber);
        return;
      }

      const isCorrect = q.answerOptions.every((opt) => {
        const selected = userAnswer.answers.includes(opt.option);
        return selected === opt.answer;
      });

      if (isCorrect) {
        if (q.questionNumber >= 1 && q.questionNumber <= 20) {
          if (test.totalPoints > 10) {
            earnedThisRound += 2;
          } else {
            earnedThisRound += 1;
          }
        } else if (q.questionNumber >= 21 && q.questionNumber <= 30) {
          earnedThisRound += 3;
        } else if (q.questionNumber >= 31 && q.questionNumber <= 40) {
          earnedThisRound += 5;
        }
      } else {
        wrongs.push(q.questionNumber);
      }
    });

    const newScore = baseScore + earnedThisRound;
    setScore(newScore);
    setWrongAnswers(wrongs);

    setFinalUserAnswers((prev) => {
      const updated = [...prev];
      userAnswers.forEach((ua) => {
        const idx = updated.findIndex(
          (a) => a.questionNumber === ua.questionNumber
        );
        if (idx >= 0) updated[idx] = ua;
        else updated.push(ua);
      });
      return updated;
    });

    setTestOver(true);
  };

  useEffect(() => {
    if (testOver && sendResult) {
      const result = ((score / test.totalPoints) * 100).toFixed(2);

      const postResult = async () => {
        try {
          await axios.post(
            "http://localhost:3003/e-nastava/testovi",
            {
              test: test._id,
              name: user?.name || "Gost",
              username: user?.username || "n/a",
              points: score,
              totalPoints: test.totalPoints,
              result,
              answers: finalUserAnswers,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
        } catch (err) {
          console.error(
            "❌ Greška kod slanja:",
            err.response?.data || err.message
          );
        } finally {
          setSendResult(false);
        }
      };

      postResult();
    }
  }, [testOver, sendResult, finalUserAnswers]);

  return (
    <div className="text-black-40">
      {testOver ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <EResult
            score={score}
            totalPoints={test.totalPoints}
            correctAnswers={correctAnswers}
            wrongAnswers={wrongAnswers}
            setReplay={setReplay}
            setReplayWrongAnswers={setReplayWrongAnswers}
            setViewAnswers={setViewAnswers}
            viewAnswers={viewAnswers}
          />
        </motion.div>
      ) : (
        <div className="flex flex-col gap-11">
          <div className="flex gap-11 text-lg max-[450px]:text-base ">
            <p>Pitanja: {test.questions.length}</p>
            <p>Vrijeme: {formatTime(timeLeft)}</p>
          </div>
          {questions.map((q, i) => (
            <motion.div
              key={q.questionNumber}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Questions
                question={q}
                viewAnswers={viewAnswers}
                handleChange={handleChange}
                userAnswers={userAnswers}
              />
            </motion.div>
          ))}
          <button
            onClick={handleTestOver}
            className="relative group max-md:w-[150px] max-sm:h-12 h-14 px-5 border-red-71 bg-red-71 text-white-60 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#DA291C,#231F20)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out"></div>
            <span className="relative text-base max-md:text-sm text-center font-light">
              ZAVRŠI TEST
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
