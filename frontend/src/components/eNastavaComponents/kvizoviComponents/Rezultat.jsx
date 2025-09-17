import Link from "next/link";

export default function Rezultat({
  result,
  userAnswers,
  setFinish,
  quiz,
  setReplay,
}) {
  return (
    <div className="text-black-40 w-full flex flex-col gap-12 items-center justify-center">
      <div className="flex flex-col gap-4 items-center justify-center">
        <p className="w-full text-xl border-b border-black-40">
          VAŠ REZULTAT JE: {result}/{quiz.questions.length}
        </p>
        <div className="flex flex-col text-lg">
          {userAnswers.map((answer, index) => {
            const question = quiz.questions.find(
              (q) => q.questionNumber === answer.questionNumber
            );

            if (!question) return null;

            const correctAnswers = question.answerOptions
              .filter((a) => a.answer)
              .map((a) => a.option);

            const userGiven = answer.answers || [];

            const isCorrect =
              correctAnswers.length === userGiven.length &&
              correctAnswers.every((c) => userGiven.includes(c));

            return (
              <div key={answer.questionNumber || index} className="flex gap-1">
                <p>{answer.questionNumber}. PITANJE: </p>
                <p>
                  {question.answerOptions.length === 0
                    ? "Odgovor za provjeru: " +
                      (userGiven.join(", ") || "Nema odgovora")
                    : isCorrect
                    ? "TOČNO"
                    : "NETOČNO"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-1">
        <button
          className="w-[150px] h-14 border border-green-80 bg-green-80 flex items-center justify-center"
          onClick={() => setReplay(true)}
        >
          <p className="text-white-60 text-sm font-light text-center">
            IGRAJ PONOVO
          </p>
        </button>
        <Link
          href={`/e-nastava/kvizovi`}
          className="w-[150px] h-14 border border-black-40 bg-black-40 flex items-center justify-center"
          onClick={() => setFinish(false)}
        >
          <p className="text-white-60 text-sm font-light text-center">
            NATRAG NA KVIZOVE
          </p>
        </Link>
      </div>
    </div>
  );
}
