import Image from "next/image";

export default function Kviz({
  quiz,
  handleAnswerChange,
  handleTextAnswerChange,
  handleSubmit,
}) {
  return (
    <div className="w-[600px] flex flex-col items-start justify-center gap-6 ">
      <p className=" text-xl text-black-40 uppercase ">{quiz.quizname}</p>
      <div className="w-full flex flex-col  gap-6">
        {quiz.questions && quiz.questions.length > 0 ? (
          quiz.questions.map((question, index) => (
            <div
              key={question._id}
              className="flex flex-col gap-6 border-b-[1px] border-black-40 "
            >
              <div className="flex  gap-3 text-lg font-semibold border-b-[1px] border-black-40 ">
                <p>{index + 1}.</p>
                <p> {question.questionText}</p>
              </div>
              <div className="flex flex-col gap-3">
                {question.options && question.options.length > 0 ? (
                  question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-3">
                      <label>
                        <input
                          type="radio"
                          name={`question-${question._id}`}
                          value={option.optionValue}
                          onChange={() =>
                            handleAnswerChange(
                              question._id,
                              option.optionValue,
                              question.answer
                            )
                          }
                        />
                        {option.optionText}
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="mb-1">
                    <label>
                      <input
                        type="text"
                        name={`question-${question._id}`}
                        className="w-full h-10 border border-black-40 "
                        onChange={(e) =>
                          handleTextAnswerChange(
                            question._id,
                            e.target.value,
                            question.answer
                          )
                        }
                      />
                    </label>
                  </div>
                )}
              </div>
              {question.image && (
                <Image
                  src={`/uploads/${question.image}`}
                  alt="..."
                  width={200}
                  height={200}
                />
              )}
            </div>
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="w-full h-10 border border-black-40 bg-black-40 mb-1"
      >
        <p className=" text-white-60 text-base   font-light text-center ">
          ZAVRŠI I PREDAJ
        </p>
      </button>
    </div>
  );
}
