import clsx from "clsx";

export default function ViewAnswer({
  answerOption,
  questionNumber,
  userAnswers,
}) {
  const userAnswer = userAnswers.find(
    (answer) => answer.questionNumber === questionNumber
  );
  const userAnswerList = userAnswer ? userAnswer.answers : [];

  return (
    <div className={clsx(answerOption.answer ? "bg-green-80" : "bg-red-71")}>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          checked={userAnswerList.includes(answerOption.option)}
          value={answerOption.option}
          disabled
        />
        {answerOption.option}
      </label>
    </div>
  );
}
