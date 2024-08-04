import React from 'react'

export default function Progress({questions, index, points, maxPoints, answer}) {

  return (
    <header className='progress'>
        
        <progress max={questions.length} value={index + Number(answer !== null)}></progress>

        <p>Question <strong> {index + 1} / {questions.length}</strong></p>

        <p><strong>{points} / {maxPoints}</strong></p>
    </header>
  )
}
