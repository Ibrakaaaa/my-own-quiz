import React from "react";

export default function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;
   if(index < numQuestions - 1) return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion", payload: index + 1 })}
      style={answer !== null ? { display: "block" } : { display: "none" }}
    >
      Next Question
    </button>
  );

  if(index === numQuestions - 1) return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "finished", payload: index + 1 })}
      style={answer !== null ? { display: "block" } : { display: "none" }}
    >
      Finish Quiz
    </button>
  );
}
