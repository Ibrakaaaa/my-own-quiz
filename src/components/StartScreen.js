import React from 'react'

export default function StartScreen({numQuestions, dispatch}) {
  return (
    <div className='start'>
        <h2>
        Welcome to the Germany Quiz
        </h2>
        <h3> {numQuestions} questions to test your knowledge of Germany</h3>
        <button className='btn btn-ui' onClick={() => dispatch({type: "start"})}>Lets start! 🚀</button>
        </div>
  )
}
