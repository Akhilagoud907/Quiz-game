import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class QuizGame extends Component {
  state = {
    questionsList: [],
    currentQuestionIndex: 0,
    apiStatus: apiStatusConstants.initial,
    selectedOptionId: '',
    score: 0,
    timeLeft: 15,
    isNextDisabled: true,
    userAnswers: {},
  }

  componentDidMount() {
    this.getQuestions()
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  startTimer = () => {
    this.timerId = setInterval(() => {
      this.setState(prevState => {
        if (prevState.timeLeft === 1) {
          clearInterval(this.timerId)
          this.goToNextQuestion()
        }
        return {timeLeft: prevState.timeLeft - 1}
      })
    }, 1000)
  }

  getQuestions = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const response = await fetch('https://apis.ccbp.in/assess/questions', {
      headers: {Authorization: `Bearer ${jwtToken}`},
    })

    if (response.ok) {
      const data = await response.json()

      const updatedData = data.questions.map(each => ({
        id: each.id,
        questionText: each.question_text,
        questionNumber: each.question_number,
        optionsType: each.options_type,
        options: each.options.map(option => ({
          id: option.id,
          text: option.text,
          imageUrl: option.image_url,
          isCorrect: option.is_correct === 'true',
        })),
      }))

      this.setState(
        {
          questionsList: updatedData,
          apiStatus: apiStatusConstants.success,
        },
        this.startTimer,
      )
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onSelectOption = option => {
    const {selectedOptionId, currentQuestionIndex} = this.state
    if (selectedOptionId !== '') return

    clearInterval(this.timerId)

    this.setState(prevState => ({
      selectedOptionId: option.id,
      score: option.isCorrect ? prevState.score + 1 : prevState.score,
      isNextDisabled: false,
      userAnswers: {
        ...prevState.userAnswers,
        [currentQuestionIndex]: option.id,
      },
    }))
  }

  goToNextQuestion = () => {
    const {currentQuestionIndex, questionsList, score, userAnswers} = this.state
    const {history} = this.props

    const totalQuestions = questionsList.length

    if (currentQuestionIndex === totalQuestions - 1) {
      history.replace('/game-results', {
        score,
        total: totalQuestions,
        questionsData: questionsList,
        userAnswers,
      })
    } else {
      this.setState(
        prevState => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
          selectedOptionId: '',
          timeLeft: 15,
          isNextDisabled: true,
        }),
        this.startTimer,
      )
    }
  }

  renderOptions = question => {
    const {selectedOptionId, currentQuestionIndex} = this.state
    const isAnswered = selectedOptionId !== ''

    return question.options.map(option => {
      const isSelected = selectedOptionId === option.id

      let className = 'option-btn'

      if (isAnswered) {
        if (option.isCorrect) {
          className = 'option-btn correct'
        }

        if (isSelected && !option.isCorrect) {
          className = 'option-btn wrong'
        }
      }

      // IMAGE TYPE
      if (question.optionsType === 'IMAGE') {
        return (
          <li key={option.id}>
            <button
              type="button"
              onClick={() => this.onSelectOption(option)}
              className={className}
              disabled={isAnswered}
            >
              <img src={option.imageUrl} alt={option.text} />

              {/* Correct Icon */}
              {option.isCorrect && isAnswered && (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                  alt="correct checked circle"
                  className="result-icon"
                />
              )}

              {/* Incorrect Icon */}
              {isSelected && !option.isCorrect && (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
                  alt="incorrect close circle"
                  className="result-icon"
                />
              )}
            </button>
          </li>
        )
      }

      // SINGLE_SELECT TYPE
      if (question.optionsType === 'SINGLE_SELECT') {
        return (
          <li key={option.id}>
            <input
              type="radio"
              id={`q${currentQuestionIndex}-o${option.id}`}
              name={`question-${currentQuestionIndex}`}
              value={option.id}
              checked={isSelected}
              onChange={() => this.onSelectOption(option)}
              disabled={isAnswered}
            />
            <label
              htmlFor={`q${currentQuestionIndex}-o${option.id}`}
              className={className}
            >
              {option.text}

              {/* Correct Icon */}
              {option.isCorrect && isAnswered && (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                  alt="correct checked circle"
                  className="result-icon"
                />
              )}

              {/* Incorrect Icon */}
              {isSelected && !option.isCorrect && (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
                  alt="Incorrect close Circle"
                  className="result-icon"
                />
              )}
            </label>
          </li>
        )
      }

      // DEFAULT TYPE
      return (
        <li key={option.id}>
          <button
            type="button"
            onClick={() => this.onSelectOption(option)}
            className={className}
            disabled={isAnswered}
          >
            {option.text}

            {/* Correct Icon */}
            {option.isCorrect && isAnswered && (
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                alt="correct checked circle"
                className="result-icon"
              />
            )}

            {/* Incorrect Icon */}
            {isSelected && !option.isCorrect && (
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
                alt="incorrect close circle"
                className="result-icon"
              />
            )}
          </button>
        </li>
      )
    })
  }

  renderSuccessView = () => {
    const {
      questionsList,
      currentQuestionIndex,
      timeLeft,
      isNextDisabled,
    } = this.state

    const totalQuestions = questionsList.length
    const activeQuestion = currentQuestionIndex + 1
    const currentQuestion = questionsList[currentQuestionIndex]

    return (
      <>
        <Header />
        <div className="quiz-container">
          <div className="quiz-card">
            <p>Question</p>
            <p>
              {activeQuestion}/{totalQuestions}
            </p>
            <p>{currentQuestion.questionNumber}</p>
            <p>{currentQuestion.questionText}</p>

            <p className="timer">Time Left: {timeLeft}</p>

            <ul className="options-list">
              {this.renderOptions(currentQuestion)}
            </ul>

            {currentQuestionIndex !== totalQuestions - 1 && (
              <button
                type="button"
                onClick={this.goToNextQuestion}
                disabled={isNextDisabled}
                className="next-btn"
              >
                Next Question
              </button>
            )}

            {currentQuestionIndex === totalQuestions - 1 && (
              <button
                type="button"
                onClick={this.goToNextQuestion}
                disabled={isNextDisabled}
                className="next-btn"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
      <p>Our servers are busy please try again</p>
      <button type="button" onClick={this.getQuestions}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default withRouter(QuizGame)
