import { useState } from "react";
import clsx from "clsx";

export default function Option({
  showAnswer,
  answerOption,
  userAnswer,
  handleChange,
}) {
  return (
    <div
      className={clsx(
        showAnswer ? (answerOption.answer ? "bg-green-80" : "bg-red-71") : ""
      )}
    >
      <label className=" cursor-pointer ">
        <input
          type="checkbox"
          checked={userAnswer.includes(answerOption.option)}
          value={answerOption.option}
          onChange={handleChange}
        />
        {answerOption.option}
      </label>
    </div>
  );
}
