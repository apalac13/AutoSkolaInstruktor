import Image from "next/image";

export default function Option({
  showAnswer,
  answerOption,
  userAnswer,
  handleChange,
}) {
  return (
    <div className="flex gap-3 ">
      <label className="flex items-center gap-3 cursor-pointer ">
        <input
          type="checkbox"
          className=" w-10 h-10"
          checked={userAnswer.includes(answerOption.option)}
          value={answerOption.option}
          onChange={handleChange}
        />
        <p className="text-base">{answerOption.option}</p>
      </label>
      {showAnswer ? (
        answerOption.answer ? (
          <Image
            src="/accept_check_black.svg"
            alt="Correct icon"
            width={32}
            height={32}
          />
        ) : (
          <Image src="/wrong.svg" alt="Wrong icon" width={32} height={32} />
        )
      ) : (
        <></>
      )}
    </div>
  );
}
