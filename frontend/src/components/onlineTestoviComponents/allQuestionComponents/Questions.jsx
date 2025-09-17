"use client";
import Image from "next/image";

export default function Questions({
  question,
  viewAnswers,
  handleChange,
  userAnswers,
}) {
  const currentAnswer = userAnswers.find(
    (a) => a.questionNumber === question.questionNumber
  );

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 text-xl max-[450px]:text-lg text-justify font-semibold">
        <p>{question.questionNumber}.</p>
        <p>{question.questionText}</p>
      </div>
      <div className="flex flex-col gap-3 items-start border-y border-black-40 py-10">
        {question.answerOptions && question.answerOptions.length > 0 ? (
          question.answerOptions.map((answerOption) => {
            const isChecked =
              currentAnswer?.answers.includes(answerOption.option) || false;
            const showIcon = viewAnswers;
            const isCorrect = answerOption.answer;

            return (
              <div key={answerOption._id} className="flex gap-3 items-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className={`online-prijava-checkbox w-10 h-10 border border-black-40 bg-white-60 checked:bg-black-40 cursor-pointer`}
                    value={answerOption.option}
                    onChange={() =>
                      handleChange(question.questionNumber, answerOption.option)
                    }
                    checked={isChecked}
                    disabled={viewAnswers}
                  />
                  <p className="text-base text-justify">
                    {answerOption.option}
                  </p>
                </label>
                {showIcon && (
                  <Image
                    src={
                      isCorrect
                        ? "/icons/accept_check_black.svg"
                        : "/icons/wrong.svg"
                    }
                    alt={isCorrect ? "Correct icon" : "Wrong icon"}
                    width={28}
                    height={28}
                    className="w-7 h-7"
                  />
                )}
              </div>
            );
          })
        ) : (
          <div className="mb-1">
            <label>
              <input
                type="text"
                name={`question-${question._id}`}
                className="w-full h-10 border border-black-40 "
                onChange={(e) =>
                  handleChange(question.questionNumber, e.target.value, true)
                }
                disabled={viewAnswers}
              />
            </label>
          </div>
        )}
        {question.image && (
          <Image
            src={`/uploads/${question.image}`}
            alt={"question image"}
            width={300}
            height={300}
          />
        )}
      </div>
    </div>
  );
}
