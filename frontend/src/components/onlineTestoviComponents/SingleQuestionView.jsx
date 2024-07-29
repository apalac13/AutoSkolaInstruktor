import { useState, useEffect } from "react";
import Option from "./singleQuestionComponents/Option";
import ViewAnswer from "./singleQuestionComponents/viewAnswer";
import Result from "./allQuestionComponents/Result";

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
        <>
          <p>{questions[currentQuestion].questionText}</p>
          {questions[currentQuestion].answerOptions.map((answerOption, index) =>
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
            <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
              NEXT QUESTION
            </button>
          ) : nextQuestion === false ? (
            <button onClick={checkAnswer}>CONFIRM ANSWERS</button>
          ) : (
            <button onClick={handleNextQuestion}>NEXT QUESTION</button>
          )}
        </>
      ) : (
        <Result
          testName={test.testName}
          score={score}
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
