import Image from "next/image";

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
    <div className="flex gap-3 ">
      <label className="flex items-center gap-3 cursor-pointer ">
        <div className="w-10 h-10">
          <input
            type="checkbox"
            className="online-prijava-checkbox w-10 h-10 border border-black-40 bg-white-60 checked:bg-black-40 cursor-pointer "
            checked={userAnswerList.includes(answerOption.option)}
            value={answerOption.option}
            disabled
          />
        </div>
        <p className="text-base text-justify">{answerOption.option}</p>
      </label>
      {answerOption.answer ? (
        <Image
          src="/icons/accept_check_black.svg"
          alt="Correct icon"
          width={32}
          height={32}
          className="w-7 h-7"
        />
      ) : (
        <Image
          src="/icons/wrong.svg"
          alt="Wrong icon"
          width={32}
          height={32}
          className="w-7 h-7"
        />
      )}
    </div>
  );
}
