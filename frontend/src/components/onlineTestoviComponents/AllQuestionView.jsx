import { useState, useEffect } from "react";
import Questions from "./allQuestionComponents/Questions";
import Result from "./allQuestionComponents/Result";

export default function AllQuestionView({ test }) {
  const [questions, setQuestions] = useState(test.questions);
  const [userAnswers, setUserAnswers] = useState([]);
  const [testOver, setTestOver] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [replayWrongAnswers, setReplayWrongAnswers] = useState(false);
  const [replay, setReplay] = useState(false);
  const [viewAnswers, setViewAnswers] = useState(false);

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
    }
  }, [replayWrongAnswers]);

  useEffect(() => {
    if (viewAnswers) {
      setWrongAnswers(wrongAnswers);
      setReplay(false);
      setUserAnswers(userAnswers);
      setQuestions(test.questions);
      setTestOver(false);
    }
  }, [viewAnswers]);

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
        <Result
          score={score}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          setReplay={setReplay}
          setReplayWrongAnswers={setReplayWrongAnswers}
          setViewAnswers={setViewAnswers}
          viewAnswers={viewAnswers}
        />
      ) : (
        <div className="flex flex-col gap-11">
          <div className="flex gap-11 text-lg ">
            <p>Pitanja: {questions.length}</p>
            <p>Vrijeme: 50 minuta</p>
          </div>
          {questions.map((question) => (
            <Questions
              key={question.questionNumber}
              question={question}
              viewAnswers={viewAnswers}
              handleChange={handleChange}
              userAnswers={userAnswers}
            />
          ))}
          <button onClick={handleTestOver}>ZAVRŠI TEST</button>
        </div>
      )}
    </div>
  );
}
