"use client";

import { useState, useEffect } from "react";
import Questions from "@/components/onlineTestoviComponents/allQuestionComponents/Questions";
import EResult from "./EResult";
import { motion } from "framer-motion";
import axios from "axios";

const INITIAL_TIME = 50 * 60; // 50 minutes

export default function EAllQuestionView({ test, user }) {
  const [questions, setQuestions] = useState(test.questions);
  const [userAnswers, setUserAnswers] = useState([]); // aktivni odgovori u tekućem krugu
  const [finalUserAnswers, setFinalUserAnswers] = useState([]); // svi odgovori za pregled
  const [testOver, setTestOver] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [baseScore, setBaseScore] = useState(0); // bodovi koji ostaju pri ponavljanju
  const [replayWrongAnswers, setReplayWrongAnswers] = useState(false);
  const [replay, setReplay] = useState(false);
  const [viewAnswers, setViewAnswers] = useState(false);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [sendResult, setSendResult] = useState(true);

  const correctAnswers = test.questions.length - wrongAnswers.length;

  // Ponovi cijeli test
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

  // Ponovi samo pogrešne odgovore
  useEffect(() => {
    if (replayWrongAnswers) {
      const wrongQuestions = test.questions.filter((q) =>
        wrongAnswers.includes(q.questionNumber)
      );

      // Izračunaj bodove koje korisnik već ima od točnih pitanja
      let alreadyEarned = 0;
      test.questions.forEach((q) => {
        if (!wrongAnswers.includes(q.questionNumber)) {
          if (q.questionNumber >= 1 && q.questionNumber <= 20)
            alreadyEarned += 2;
          else if (q.questionNumber >= 21 && q.questionNumber <= 30)
            alreadyEarned += 3;
          else if (q.questionNumber >= 31 && q.questionNumber <= 40)
            alreadyEarned += 5;
        }
      });

      setBaseScore(alreadyEarned);
      setScore(alreadyEarned);
      setReplayWrongAnswers(false);
      setViewAnswers(false);
      setUserAnswers([]); // nova sesija za pogrešna pitanja
      setQuestions(wrongQuestions);
      setWrongAnswers([]);
      setTestOver(false);
      setTimeLeft(INITIAL_TIME);
      setSendResult(false); // ne šalji odmah
    }
  }, [replayWrongAnswers]);

  // Pregled svih odgovora
  useEffect(() => {
    if (viewAnswers) {
      setQuestions(test.questions);
      setTestOver(false);
      setTimeLeft(INITIAL_TIME);
      setSendResult(false);
      setUserAnswers(finalUserAnswers); // prikaz svih odgovora
    }
  }, [viewAnswers, finalUserAnswers]);

  // Timer
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
        if (q.questionNumber >= 1 && q.questionNumber <= 20)
          earnedThisRound += 2;
        else if (q.questionNumber >= 21 && q.questionNumber <= 30)
          earnedThisRound += 3;
        else if (q.questionNumber >= 31 && q.questionNumber <= 40)
          earnedThisRound += 5;
      } else {
        wrongs.push(q.questionNumber);
      }
    });

    const newScore = baseScore + earnedThisRound;
    setScore(newScore);
    setWrongAnswers(wrongs);

    // Spremi odgovore za pregled
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

  // Slanje rezultata backendu
  useEffect(() => {
    if (testOver && sendResult) {
      const result = ((score / test.totalPoints) * 100).toFixed(2);

      const postResult = async () => {
        try {
          await axios.post(
            "http://localhost:3003/e-nastava/testovi",
            {
              test: test.testName,
              name: user?.name || "Gost",
              email: user?.email || "n/a",
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
          console.log("✅ Rezultat poslan");
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
            className="w-full h-16 max-sm:h-14 border border-red-71 bg-red-71 hover:bg-red-71/90 transition"
            onClick={handleTestOver}
          >
            <p className="text-base max-md:text-sm text-white-60">
              ZAVRŠI TEST
            </p>
          </button>
        </div>
      )}
    </div>
  );
}
