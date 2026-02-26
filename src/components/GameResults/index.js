import {withRouter, Redirect} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const GameResults = props => {
  const {location, history} = props

  if (!location.state) {
    return <Redirect to="/" />
  }

  const {score, total, questionsData, userAnswers} = location.state
  const percentage = Math.floor((score / total) * 100)
  const isWon = percentage >= 60

  const handleReport = () => {
    history.push('/game-report', {
      score,
      total,
      questionsData,
      userAnswers,
    })
  }

  return (
    <>
      <Header />
      <div className={`results-container ${isWon ? 'won' : ''}`}>
        {isWon ? (
          <>
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
              alt="won"
            />
            <h1>Congrats</h1>
            <h1>{percentage}% Correctly Answered</h1>
            <p>Quiz completed successfully</p>
          </>
        ) : (
          <>
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png"
              alt="lose"
            />
            <h1>You lose</h1>
            <h1>{percentage}% Correctly Answered</h1>
          </>
        )}

        <p>
          You attempted {score} out of {total} questions as correct
        </p>

        <button type="button" onClick={handleReport}>
          Report
        </button>
      </div>
    </>
  )
}

export default withRouter(GameResults)
