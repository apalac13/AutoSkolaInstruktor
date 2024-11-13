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
        <input
          type="checkbox"
          className=" w-10 h-10"
          checked={userAnswerList.includes(answerOption.option)}
          value={answerOption.option}
          disabled
        />
        <p className="text-base">{answerOption.option}</p>
      </label>
      {answerOption.answer ? (
        <Image
          src="/icons/accept_check_black.svg"
          alt="Correct icon"
          width={32}
          height={32}
        />
      ) : (
        <Image src="/icons/wrong.svg" alt="Wrong icon" width={32} height={32} />
      )}
    </div>
  );
}
