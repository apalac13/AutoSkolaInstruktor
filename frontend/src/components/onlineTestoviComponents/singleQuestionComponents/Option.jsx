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
        <div className="w-10 h-10">
          <input
            type="checkbox"
            className="online-prijava-checkbox w-10 h-10 border border-black-40 bg-white-60 checked:bg-black-40 cursor-pointer "
            checked={userAnswer.includes(answerOption.option)}
            value={answerOption.option}
            onChange={handleChange}
          />
        </div>
        <p className="text-base text-justify">{answerOption.option}</p>
      </label>
      {showAnswer ? (
        answerOption.answer ? (
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
        )
      ) : (
        <></>
      )}
    </div>
  );
}
