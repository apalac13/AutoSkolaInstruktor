import Image from "next/image";

export default function Questions({
  question,
  viewAnswers,
  handleChange,
  userAnswers,
}) {
  return (
    <div className="flex flex-col ">
      <div className="flex gap-2 text-xl font-semibold">
        <p>{question.questionNumber}.</p>
        <p>{question.questionText}</p>
      </div>
      <div className="flex flex-col gap-3 items-start border-y border-black-40 py-10">
        {question.answerOptions.map((answerOption, index) => (
          <div key={index} className="flex gap-3 ">
            <label
              htmlFor=""
              className="flex items-center gap-3 cursor-pointer "
            >
              <input
                type="checkbox"
                className="w-10 h-10"
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
              <p className="text-base">{answerOption.option}</p>
            </label>
            {viewAnswers ? (
              answerOption.answer ? (
                <Image
                  src="/icons/accept_check_black.svg"
                  alt="Correct icon"
                  width={32}
                  height={32}
                />
              ) : (
                <Image
                  src="/icons/wrong.svg"
                  alt="Wrong icon"
                  width={32}
                  height={32}
                />
              )
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
