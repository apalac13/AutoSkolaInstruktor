import Link from "next/link";

export default function Rezultat({ result, setFinish, kvizId }) {
  return (
    <div className=" text-black-40 w-full flex flex-col gap-12 items-center justify-center">
      <div className="flex flex-col gap-4 items-center justify-center">
        <p className="w-full text-2xl border-b border-black-40">
          VAŠ REZULTAT JE: {result.result}/{result.answers.length}{" "}
        </p>
        <div className="flex flex-col text-lg">
          {result.answers.map((answer, index) => (
            <div key={index} className="flex gap-1">
              <p>{index + 1}. PITANJE: </p>
              <p>
                {answer.selectedOption === answer.correctAnswer
                  ? "TOČNO"
                  : answer.correctAnswer === ""
                  ? "Odgovor za provjeru: " + answer.selectedOption
                  : "NETOČNO"}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex   gap-1">
        <Link href={`/e-nastava/kvizovi/${kvizId}`} className="w-[200px]">
          <button
            onClick={() => setFinish(false)}
            className="w-[200px] h-14  border border-green-80 bg-green-80 "
          >
            <p className=" text-white-60 text-base font-light  text-center ">
              IGRAJ PONOVO
            </p>
          </button>
        </Link>
        <Link href={`/e-nastava/kvizovi`} className="w-[150px]">
          <button
            onClick={() => setFinish(false)}
            className="w-[200px] h-14  border border-black-40 bg-black-40 "
          >
            <p className=" text-white-60 text-base font-light  text-center ">
              NATRAG NA KVIZOVE
            </p>
          </button>
        </Link>
      </div>
    </div>
  );
}
