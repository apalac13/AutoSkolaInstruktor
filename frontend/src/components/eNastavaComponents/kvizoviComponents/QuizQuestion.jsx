import Image from "next/image";

export default function QuizQuestion({ question, index, deleteQuestion }) {
  return (
    <div className="flex flex-col gap-6 border-b-[1px] border-black-40 ">
      <div className="flex  gap-3 text-lg font-semibold border-b-[1px] border-black-40 ">
        <p>{index + 1}.</p>
        <p> {question.questionText}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className=" w-10 h-10 flex items-center justify-center  border border-black-40">
                <p className=" text-xl ">{index + 1}</p>
              </div>
              <p key={option.optionValue} className=" text-base">
                {option.optionText}
              </p>
            </div>
          ))}
        </div>
        {question.image && (
          <Image
            src={`/uploads/${question.image}`}
            alt="..."
            width={300}
            height={300}
          />
        )}
      </div>
      <button
        onClick={() => deleteQuestion(question._id)}
        className="relative group w-[100px] h-10 mb-2 border-red-71 bg-red-71 "
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#DA291C,#231F20)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out"></div>
        <span className="relative text-white-60 text-xs text-center font-light">
          IZBRIŠI
        </span>
      </button>
    </div>
  );
}
