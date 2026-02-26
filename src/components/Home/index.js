import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <main className="home-container">
      <div className="home-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
          alt="start quiz game"
          className="home-image"
        />

        <h1 className="home-heading">
          How Many Of These Questions Do You Actually Know?
        </h1>

        <p className="home-description">
          Test yourself with these easy quiz questions and answers
        </p>

        <div className="warning-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
            alt="warning icon"
            className="warning-icon"
          />
          <p className="warning-text">
            All the progress will be lost, if you reload during the quiz
          </p>
        </div>

        <Link to="/quiz-game">
          <button type="button" className="start-quiz-btn">
            Start Quiz
          </button>
        </Link>
      </div>
    </main>
  </>
)

export default Home
