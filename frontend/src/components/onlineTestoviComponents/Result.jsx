import Link from "next/link";
import Button from "../buttons/Button";

export default function Result({
  score,
  totalPoints,
  correctAnswers,
  wrongAnswers,
  setReplay,
  setReplayWrongAnswers,
  setViewAnswers,
  viewAnswers,
}) {
  const result = ((score / totalPoints) * 100).toFixed(2);

  return (
    <div className="flex flex-col gap-[86px] items-center justify-center">
      <div className="flex gap-3 text-xl max-[430px]:text-base">
        <p className="font-semibold  ">REZULTAT:</p>
        <p>{result}%</p>
        {result >= 90 ? (
          <p className=" text-green-80">PROLAZ</p>
        ) : (
          <p className="text-red-71">PAD</p>
        )}
      </div>
      <div className="flex flex-col gap-10 text-lg max-[430px]:text-base">
        <div className="flex gap-5 justify-between">
          <h2 className="flex max-[430px]:flex-col gap-1">
            <p>bodovi:</p>{" "}
            <p>
              {score}/ {totalPoints}
            </p>
          </h2>
          <h3 className="flex max-[430px]:flex-col gap-1">
            <p>broj točnih odgovora:</p> <p>{correctAnswers}</p>
          </h3>
        </div>
        <div className="flex max-sm:flex-col gap-11 max-sm:gap-4 text-justify">
          <div
            className="flex gap-2 items-end cursor-pointer"
            onClick={() => setReplay(true)}
          >
            <div className="w-8 h-8 border border-black-40 rounded-full  "></div>
            <p>ponovi</p>
          </div>
          <div
            className="flex gap-2 items-end cursor-pointer"
            onClick={() => setReplayWrongAnswers(true)}
          >
            <div className="w-8 h-8 border border-black-40 rounded-full  "></div>
            <p>ponovi pogrešna pitanja</p>
          </div>
          <div
            className="flex gap-2 items-end cursor-pointer"
            onClick={() => setViewAnswers(!viewAnswers)}
          >
            <div className="w-8 h-8 border border-black-40 rounded-full"></div>
            <p>pogledaj</p>
          </div>
        </div>
      </div>
      <Link href={"/online-testovi"} className="w-full">
        <Button
          type={"button"}
          width={"full"}
          text={"NATRAG NA TESTOVE"}
          color={"red"}
        />
      </Link>
    </div>
  );
}
