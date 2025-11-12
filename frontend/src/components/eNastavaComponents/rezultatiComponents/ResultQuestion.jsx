"use client";
import Image from "next/image";

export default function ResultQuestion({ question, testAnswer }) {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 text-xl max-[450px]:text-lg text-justify font-semibold">
        <p>{question.questionNumber}.</p>
        <p>{question.questionText}</p>
      </div>
      <div className="flex flex-row max-lg:flex-col max-lg:gap-8 justify-between border-y border-black-40 py-10">
        {!question.answerOptions || question.answerOptions.length === 0 ? (
          <div className="border border-black-40 p-2">
            <p className="text-black-40 ">
              {testAnswer?.answers?.[0] || "Kandidat nije ništa odgovorio"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 items-start">
            {question.answerOptions.map((answerOption, index) => {
              const isChecked =
                testAnswer?.answers?.includes(answerOption.option) || false;
              const isCorrect = answerOption.answer;
              return (
                <div key={index} className="flex gap-3 items-center">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="w-10 h-10">
                      <input
                        type="checkbox"
                        className={`online-prijava-checkbox w-10 h-10 border border-black-40 bg-white-60 checked:bg-black-40 cursor-pointer`}
                        value={answerOption.option}
                        checked={isChecked}
                        disabled
                      />
                    </div>
                    <p className="text-base text-justify">
                      {answerOption.option}
                    </p>
                  </label>
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
                </div>
              );
            })}
          </div>
        )}
        {question.image && (
          <Image
            src={`/uploads/${question.image}`}
            alt={"question image"}
            width={250}
            height={200}
          />
        )}
      </div>
    </div>
  );
}
