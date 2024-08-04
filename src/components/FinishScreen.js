import React from "react";
import RestartButton from "./RestartButton";

export default function FinishScreen({ points, maxPoints, highscore, dispatch }) {
  const percentage = (points / maxPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🎖️";
  if (percentage >= 80 && percentage < 100) emoji = "🥳";
  if (percentage >= 60 && percentage < 80) emoji = "🚀";
  if (percentage >= 40 && percentage < 60) emoji = "👍";
  if (percentage >= 20 && percentage < 40) emoji = "😐";
  if (percentage === 0) emoji = "☹️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You got <strong>{points}</strong> points from{" "}
        <strong>{maxPoints}</strong> maxPoints{" "}
        <strong>({Math.ceil(percentage)} %) </strong>
      </p>

      <p className="highscore">Highscore: <strong>{highscore}</strong> points</p>

      <RestartButton dispatch={dispatch}  />
    </>
  );
}
