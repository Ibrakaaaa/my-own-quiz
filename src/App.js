import React, { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECS_PER_QUESTION = 30

const initialState = {
  questions: [],

  status: "loading",
  index: 0,
  // loading, error, ready, active, finished
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemeining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemeining: state.questions.length * SECS_PER_QUESTION

      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

      case "finished":
        return {
          ...state,
          status: "finished",
          highscore: 
          state.points > state.highscore ? state.points : state.highscore
        }

        case "restart": 
        return {
          ...state,
          status: "ready",
          index: 0,
          // loading, error, ready, active, finished
          answer: null,
          points: 0,
          highscore: 0,
          secondsRemeining: null,

        }
        case "tick":
          return {
            ...state,
            secondsRemeining: state.secondsRemeining - 1,
            status: state.secondsRemeining === 0 ? "finished" 
            : state.status,
          }

    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const res = await fetch(`http://localhost:9000/questions`);
      const data = await res.json();
      dispatch({ type: "dataRecived", payload: data });
      console.log(data);
    } catch (error) {
      dispatch({ type: "dataFailed" });
    }
  }

  const numQuestions = state.questions.length;
  const maxPoints = state.questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <Error />}
        {state.status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {state.status === "active" && (
          <>
            <Progress
              questions={state.questions}
              index={state.index}
              points={state.points}
              maxPoints={maxPoints}
              answer={state.answer}
            />
            <Question
              dispatch={dispatch}
              answer={state.answer}
              question={state.questions[state.index]}
              
              />
              
            <Footer>
              <Timer dispatch={dispatch} secondsRemeining={state.secondsRemeining} />
            <NextButton
              dispatch={dispatch}
              answer={state.answer}
              index={state.index}
              numQuestions={numQuestions}
              >
              Nächste Frage
            </NextButton>
              </Footer>
          </>
        )}
        {state.status === "finished" && <FinishScreen dispatch={dispatch} points={state.points} maxPoints={maxPoints} highscore={state.highscore}/>}
      </Main>
    </div>
  );
}
