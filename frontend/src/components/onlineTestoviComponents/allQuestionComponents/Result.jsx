export default function Result({
  testName,
  score,
  wrongAnswers,
  setReplay,
  setReplayWrongAnswers,
  setViewAnswers,
  viewAnswers,
}) {
  return (
    <div>
      <h1>{testName}</h1>
      <h2>Your Score: {score}/120</h2>
      <h3>Wrong Answers: {wrongAnswers.length}</h3>
      <button className="border" onClick={() => setReplay(true)}>
        REPLAY WHOLE TEST
      </button>
      <button className="border" onClick={() => setReplayWrongAnswers(true)}>
        REPLAY WRONG ANSWERS
      </button>
      <button className="border" onClick={() => setViewAnswers(!viewAnswers)}>
        VIEW
      </button>
    </div>
  );
}
