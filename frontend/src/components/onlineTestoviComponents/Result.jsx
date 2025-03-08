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
      <div className="flex gap-3 text-xl">
        <p className="font-semibold  ">REZULTAT:</p>
        <p>{result}%</p>
        {result >= 90 ? (
          <p className=" text-green-80">PROLAZ</p>
        ) : (
          <p className="text-red-71">PAD</p>
        )}
      </div>
      <div className="flex flex-col gap-10 text-lg">
        <div className="flex justify-between">
          <h2>
            bodovi: {score}/ {totalPoints}
          </h2>
          <h3>broj točnih odgovora: {correctAnswers}</h3>
        </div>
        <div className="flex gap-11">
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
            <div className="w-8 h-8 border border-black-40 rounded-full  "></div>
            <p>pogledaj</p>
          </div>
        </div>
      </div>
    </div>
  );
}
