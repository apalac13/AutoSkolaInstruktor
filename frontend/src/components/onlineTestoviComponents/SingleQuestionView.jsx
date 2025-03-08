import { useState, useEffect } from "react";
import Option from "./singleQuestionComponents/Option";
import ViewAnswer from "./singleQuestionComponents/viewAnswer";
import Result from "./Result";
import Image from "next/image";
import { motion, AnimatePresence, time } from "framer-motion";

export default function SingleQuestionView({ test }) {
  const [userAnswer, setUserAnswer] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [replayWrongAnswers, setReplayWrongAnswers] = useState(false);
  const [replay, setReplay] = useState(false);
  const [viewAnswers, setViewAnswers] = useState(false);
  const [questions, setQuestions] = useState(test.questions);
  const [timeLeft, setTimeLeft] = useState(50 * 60);
  const correctAnswers = test.questions.length - wrongAnswers.length;

  useEffect(() => {
    if (replay) {
      setCurrentQuestion(0);
      setScore(0);
      setWrongAnswers([]);
      setUserAnswer([]);
      setUserAnswers([]);
      setShowAnswer(false);
      setNextQuestion(false);
      setReplay(false);
      setViewAnswers(false);
      setQuestions(test.questions);
      setTimeLeft(3000);
    }
  }, [replay]);

  useEffect(() => {
    if (replayWrongAnswers) {
      const wrongQuestions = test.questions.filter((question) =>
        wrongAnswers.includes(question.questionNumber)
      );
      setCurrentQuestion(0);
      setScore(score);
      setUserAnswer([]);
      setShowAnswer(false);
      setNextQuestion(false);
      setReplayWrongAnswers(false);
      setViewAnswers(false);
      setQuestions(wrongQuestions);
      setWrongAnswers([]);
      setTimeLeft(3000);
    }
  }, [replayWrongAnswers]);

  useEffect(() => {
    if (viewAnswers) {
      setCurrentQuestion(0);
      setWrongAnswers(wrongAnswers);
      setUserAnswer([]);
      setShowAnswer(false);
      setNextQuestion(false);
      setReplay(false);
      setUserAnswers(userAnswers);
      setQuestions(test.questions);
      setTimeLeft(3000);
    }
  }, [viewAnswers]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCurrentQuestion(questions.length);
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

  const checkAnswer = () => {
    const currentQ = questions[currentQuestion];
    const isCorrect = currentQ.answerOptions.every((option) => {
      const userSelected = userAnswer.includes(option.option);
      return userSelected === option.answer;
    });

    if (isCorrect) {
      let points = 0;
      if (currentQ.questionNumber >= 1 && currentQ.questionNumber <= 20) {
        points = 2;
      } else if (
        currentQ.questionNumber >= 21 &&
        currentQ.questionNumber <= 30
      ) {
        points = 3;
      } else if (
        currentQ.questionNumber >= 31 &&
        currentQ.questionNumber <= 40
      ) {
        points = 5;
      }
      setScore((prevScore) => prevScore + points);
    } else {
      setWrongAnswers([...wrongAnswers, currentQ.questionNumber]);
    }
    setUserAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.questionNumber === currentQ.questionNumber
      );
      if (existingAnswerIndex >= 0) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = {
          questionNumber: currentQ.questionNumber,
          answers: userAnswer,
        };
        return updatedAnswers;
      } else {
        return [
          ...prevAnswers,
          { questionNumber: currentQ.questionNumber, answers: userAnswer },
        ];
      }
    });

    console.log(userAnswers);

    setShowAnswer(true);
    setNextQuestion(true);
  };

  const handleNextQuestion = () => {
    setNextQuestion(false);
    setShowAnswer(false);
    setUserAnswer([]);
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleChange = (event) => {
    const { value, checked } = event.target;
    setUserAnswer((prevAnswers) =>
      checked
        ? [...prevAnswers, value]
        : prevAnswers.filter((answer) => answer !== value)
    );
  };

  return (
    <div className="text-black-40">
      <AnimatePresence mode="wait">
        {currentQuestion < questions.length ? (
          <div className="flex flex-col gap-11">
            <div className="flex gap-11 text-lg ">
              <p>Pitanje: {questions[currentQuestion].questionNumber}/40</p>
              <p>Vrijeme: {formatTime(timeLeft)}</p>
            </div>
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <div className="flex flex-col ">
                <div className="flex gap-2 text-xl font-semibold">
                  <p>{questions[currentQuestion].questionNumber}.</p>
                  <p>{questions[currentQuestion].questionText}</p>
                </div>
                <div className="flex flex-col gap-3 items-start border-y border-black-40 pt-10">
                  {questions[currentQuestion].answerOptions.map(
                    (answerOption, index) =>
                      viewAnswers ? (
                        <ViewAnswer
                          key={index}
                          answerOption={answerOption}
                          questionNumber={
                            questions[currentQuestion].questionNumber
                          }
                          userAnswers={userAnswers}
                        />
                      ) : (
                        <Option
                          key={index}
                          showAnswer={showAnswer}
                          answerOption={answerOption}
                          userAnswer={userAnswer}
                          handleChange={handleChange}
                        />
                      )
                  )}
                  {viewAnswers ? (
                    <motion.div
                      key="next"
                      className="self-start pt-10 flex gap-3 items-end text-xl cursor-pointer"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    >
                      <p>Sljedeće pitanje</p>
                      <motion.img
                        src="/icons/right.svg"
                        alt="Right icon"
                        width={32}
                        height={32}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>
                  ) : nextQuestion === false ? (
                    <motion.div
                      key="confirm"
                      className="self-start pt-10 flex gap-3 items-end text-xl cursor-pointer"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4 }}
                      onClick={checkAnswer}
                    >
                      <p>Potvrdi pitanje</p>
                      <motion.img
                        src="/icons/accept_check.svg"
                        alt="Accept icon"
                        width={32}
                        height={32}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>
                  ) : (
                    <div
                      key="next"
                      className="self-start pt-10 flex gap-3 items-end text-xl cursor-pointer"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4 }}
                      onClick={handleNextQuestion}
                    >
                      <p>Sljedeće pitanje</p>
                      <motion.img
                        src="/icons/right.svg"
                        alt="Right icon"
                        width={32}
                        height={32}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
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
        )}
      </AnimatePresence>
    </div>
  );
}
