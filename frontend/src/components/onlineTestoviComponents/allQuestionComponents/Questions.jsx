import clsx from "clsx";

export default function Questions({
  question,
  viewAnswers,
  handleChange,
  userAnswers,
}) {
  return (
    <div>
      <p>{question.questionText}</p>
      {question.answerOptions.map((answerOption, index) => (
        <div
          key={index}
          className={clsx(
            viewAnswers
              ? answerOption.answer
                ? "bg-green-80"
                : "bg-red-71"
              : ""
          )}
        >
          <label htmlFor="">
            <input
              type="checkbox"
              value={answerOption.option}
              onChange={() =>
                handleChange(question.questionNumber, answerOption.option)
              }
              checked={
                userAnswers
                  .find(
                    (answer) =>
                      answer.questionNumber === question.questionNumber
                  )
                  ?.answers.includes(answerOption.option) || false
              }
              disabled={viewAnswers}
            />
            {answerOption.option}
          </label>
        </div>
      ))}
    </div>
  );
}
