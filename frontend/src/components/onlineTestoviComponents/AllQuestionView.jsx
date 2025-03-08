import { useState, useEffect } from "react";
import Questions from "./allQuestionComponents/Questions";
import Result from "./Result";
import { motion } from "framer-motion";

export default function AllQuestionView({ test }) {
  const [questions, setQuestions] = useState(test.questions);
  const [userAnswers, setUserAnswers] = useState([]);
  const [testOver, setTestOver] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [replayWrongAnswers, setReplayWrongAnswers] = useState(false);
  const [replay, setReplay] = useState(false);
  const [viewAnswers, setViewAnswers] = useState(false);
  const [timeLeft, setTimeLeft] = useState(50 * 60);
  const correctAnswers = test.questions.length - wrongAnswers.length;

  useEffect(() => {
    if (replay) {
      setScore(0);
      setWrongAnswers([]);
      setUserAnswers([]);
      setReplay(false);
      setViewAnswers(false);
      setQuestions(test.questions);
      setTestOver(false);
      setTimeLeft(3000);
    }
  }, [replay]);

  useEffect(() => {
    if (replayWrongAnswers) {
      const wrongQuestions = test.questions.filter((question) =>
        wrongAnswers.includes(question.questionNumber)
      );
      setScore(score);
      setReplayWrongAnswers(false);
      setViewAnswers(false);
      setUserAnswers(userAnswers);
      setQuestions(wrongQuestions);
      setWrongAnswers([]);
      setTestOver(false);
      setTimeLeft(3000);
    }
  }, [replayWrongAnswers]);

  useEffect(() => {
    if (viewAnswers) {
      setWrongAnswers(wrongAnswers);
      setReplay(false);
      setUserAnswers(userAnswers);
      setQuestions(test.questions);
      setTestOver(false);
      setTimeLeft(3000);
    }
  }, [viewAnswers]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleTestOver();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleChange = (questionNumber, answerOption) => {
    setUserAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.questionNumber === questionNumber
      );
      if (existingAnswerIndex >= 0) {
        // Update existing answer
        const updatedAnswers = [...prevAnswers];
        const updatedQuestionAnswers = updatedAnswers[
          existingAnswerIndex
        ].answers.includes(answerOption)
          ? updatedAnswers[existingAnswerIndex].answers.filter(
              (ans) => ans !== answerOption
            )
          : [...updatedAnswers[existingAnswerIndex].answers, answerOption];
        updatedAnswers[existingAnswerIndex] = {
          questionNumber,
          answers: updatedQuestionAnswers,
        };
        return updatedAnswers;
      } else {
        // Add new answer
        return [...prevAnswers, { questionNumber, answers: [answerOption] }];
      }
    });
  };

  const handleTestOver = () => {
    let totalScore = 0;
    const wrongs = [];

    questions.forEach((question) => {
      const userAnswer = userAnswers.find(
        (answer) => answer.questionNumber === question.questionNumber
      );

      if (!userAnswer) {
        wrongs.push(question.questionNumber);
        return;
      }

      const isCorrect = question.answerOptions.every((option) => {
        const userSelected = userAnswer.answers.includes(option.option);
        return userSelected === option.answer;
      });

      if (isCorrect) {
        let points = 0;
        if (question.questionNumber >= 1 && question.questionNumber <= 20) {
          points = 2;
        } else if (
          question.questionNumber >= 21 &&
          question.questionNumber <= 30
        ) {
          points = 3;
        } else if (
          question.questionNumber >= 31 &&
          question.questionNumber <= 40
        ) {
          points = 5;
        }
        totalScore += points;
      } else {
        wrongs.push(question.questionNumber);
      }
    });

    setScore(totalScore);
    setWrongAnswers(wrongs);
    setTestOver(true);
  };

  return (
    <div className="text-black-40">
      {testOver ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Result
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
          <div className="flex gap-11 text-lg ">
            <p>Pitanja: 40 </p>
            <p>Vrijeme: {formatTime(timeLeft)}</p>
          </div>
          {questions.map((question, index) => (
            <motion.div
              key={question.questionNumber}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Questions
                question={question}
                viewAnswers={viewAnswers}
                handleChange={handleChange}
                userAnswers={userAnswers}
              />
            </motion.div>
          ))}
          <button
            className="w-full h-16  border border-red-71 bg-red-71 transition-background delay-150 duration-500  hover:bg-red-71/90 "
            onClick={handleTestOver}
          >
            <p className="text-base text-white-60 ">ZAVRŠI TEST</p>
          </button>
        </div>
      )}
    </div>
  );
}
