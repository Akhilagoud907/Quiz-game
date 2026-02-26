import {Redirect} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const GameReport = props => {
  const {location} = props

  if (!location.state) {
    return <Redirect to="/" />
  }

  const {score, total, questionsData, userAnswers} = location.state
  const attempted = Object.keys(userAnswers).length
  const unattempted = total - attempted
  const incorrect = attempted - score

  const unattemptedQuestions = questionsData.filter(
    (q, index) => !Object.prototype.hasOwnProperty.call(userAnswers, index),
  )

  return (
    <>
      <Header />
      <div className="report-container">
        <p>{score} Correct answers</p>
        <p>{incorrect} Incorrect answers</p>
        <p>{unattempted} Unattempted</p>

        {unattempted > 0 ? (
          <ul>
            {unattemptedQuestions.map(question => (
              <li key={question.id}>
                <p>{question.questionText}</p>
                <ul>
                  {question.options.map(option => (
                    <li key={option.id}>
                      {question.optionsType === 'IMAGE' ? (
                        <img src={option.imageUrl} alt={option.text} />
                      ) : (
                        <p>{option.text}</p>
                      )}
                      {option.isCorrect && <p>Correct Answer</p>}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <h1>Attempted all the questions</h1>
        )}
      </div>
    </>
  )
}

export default GameReport
