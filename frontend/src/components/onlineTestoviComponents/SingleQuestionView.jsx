import { useState, useEffect } from "react";
import Option from "./singleQuestionComponents/Option";
import ViewAnswer from "./singleQuestionComponents/viewAnswer";
import Result from "./allQuestionComponents/Result";
import Image from "next/image";

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
    }
  }, [viewAnswers]);

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
    // Update userAnswers or add a new entry if the question already exists
    setUserAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.questionNumber === currentQ.questionNumber
      );
      if (existingAnswerIndex >= 0) {
        // Update existing answer
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = {
          questionNumber: currentQ.questionNumber,
          answers: userAnswer,
        };
        return updatedAnswers;
      } else {
        // Add new answer
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
      {currentQuestion < questions.length ? (
        <div className="flex flex-col gap-11">
          <div className="flex gap-11 text-lg ">
            <p>Pitanje: {questions[currentQuestion].questionNumber}/40</p>
            <p>Vrijeme: 50 minuta</p>
          </div>
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
                      questionNumber={questions[currentQuestion].questionNumber}
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
                <div
                  className="self-start pt-10 flex gap-3 items-end text-xl cursor-pointer"
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                >
                  <p>Sljedeće pitanje</p>
                  <Image
                    src="/right.svg"
                    alt="Right icon"
                    width={32}
                    height={32}
                  />
                </div>
              ) : nextQuestion === false ? (
                <div
                  className="self-start pt-10 flex gap-3 items-end text-xl cursor-pointer"
                  onClick={checkAnswer}
                >
                  <p>Potvrdi pitanje</p>
                  <Image
                    src="/accept_check.svg"
                    alt="Accept icon"
                    width={32}
                    height={32}
                  />
                </div>
              ) : (
                <div
                  className="self-start pt-10 flex gap-3 items-end text-xl cursor-pointer"
                  onClick={handleNextQuestion}
                >
                  <p>Sljedeće pitanje</p>
                  <Image
                    src="/right.svg"
                    alt="Right icon"
                    width={32}
                    height={32}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Result
          score={score}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          setReplay={setReplay}
          setReplayWrongAnswers={setReplayWrongAnswers}
          setViewAnswers={setViewAnswers}
          viewAnswers={viewAnswers}
        />
      )}
    </div>
  );
}
