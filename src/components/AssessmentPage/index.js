import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import TimeLeft from '../TimeLeft'
import './index.css'

class AssessmentPage extends Component {
  state = {
    questionsList: [],
    currentQuestion: 0,
    unanswerdQuestion: 0,
    selectedOption: 0,
    score: 0,
  }

  componentDidMount() {
    this.getQuestions()
  }

  getQuestions = async () => {
    const api = 'https://apis.ccbp.in/assess/questions'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.questions.map(question => ({
        id: question.id,
        optionsType: question.options_type,
        questionText: question.question_text,
        options: question.options.map(option => ({
          id: option.id,
          isCorrect: option.is_correct,
          text: option.text,
          ...(question.options_type === 'IMAGE' && {
            imageUrl: option.image_url,
          }),
        })),
      }))
      this.setState({
        questionsList: updatedData,
        unanswerdQuestion: updatedData.length,
      })
    }
  }

  onNextQuestion = () => {
    this.setState(prevState => ({
      currentQuestion: prevState.currentQuestion + 1,
      unanswerdQuestion: prevState.unanswerdQuestion - 1,
    }))
  }

  addScore = isCorrect => {
    if (isCorrect) {
      console.log(isCorrect)
      this.setState(prevState => ({score: prevState.score + 1}))
    } else {
      console.log('not is inCorrect')
    }
  }

  handleSelectChange = index => {
    this.setState({selectedOption: index})
  }

  renderAssesmentContainer = () => {
    const {questionsList, currentQuestion, selectedOption} = this.state
    const question = questionsList[currentQuestion]
    console.log(questionsList)
    console.log(currentQuestion)
    if (question !== undefined) {
      return (
        <div className="question-container">
          <div>
            <h1 className="question">{question.questionText}</h1>
            <hr className="break-line" />
            {question.optionsType === 'DEFAULT' && (
              <div className="default-options-container">
                {question.options.map((option, index) => (
                  <label
                    className={`default-option-button ${
                      index === selectedOption
                        ? 'default-selected-option-button'
                        : ''
                    }`}
                    htmlFor={option.id}
                    key={option.id}
                    onChange={() => this.handleSelectChange(index)}
                  >
                    <input
                      type="radio"
                      key={option.id}
                      onClick={() => this.addScore(option.isCorrect)}
                      name="default"
                      id={option.id}
                      checked={index === selectedOption}
                      value={option.isCorrect}
                    />
                    {option.text}
                  </label>
                ))}
              </div>
            )}
            {question.optionsType === 'SINGLE_SELECT' && (
              <div className="default-options-container">
                <select className="select-options-container">
                  {question.options.map((option, index) => (
                    <option
                      value={option.text}
                      id={option.id}
                      className="select-option"
                      key={option.id}
                      selected={index === 0}
                    >
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {question.optionsType === 'IMAGE' && (
              <div className="default-options-container">
                {question.options.map((option, index) => (
                  <label
                    className={`"image-option-button" ${
                      index === selectedOption
                        ? 'selected-image-option-button'
                        : ''
                    }`}
                    htmlFor={option.id}
                    key={option.id}
                    onChange={() => this.handleSelectChange(index)}
                  >
                    <input
                      type="radio"
                      key={option.id}
                      onClick={() => this.addScore(option.isCorrect)}
                      name="default"
                      id={option.id}
                      value={option.isCorrect}
                      checked={index === selectedOption}
                    />
                    <img
                      src={option.imageUrl}
                      alt={option.text}
                      className="image-option-img"
                    />
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="next-question-button-container">
            {currentQuestion < questionsList.length - 1 && (
              <button
                type="button"
                className="next-question-button"
                onClick={this.onNextQuestion}
              >
                Next Question
              </button>
            )}
          </div>
        </div>
      )
    }
    return (
      <div className="question-container loading-container">
        <Loader type="ThreeDots" color="#263868" height="50" width="50" />
      </div>
    )
  }

  renderQuestionsStatus = () => {
    const {currentQuestion, unanswerdQuestion, score} = this.state
    console.log(score)
    return (
      <div className="AP-questions-count">
        <div className="count-container">
          <div className="AQ-count-ans AQ-center-count">
            <p>{currentQuestion}</p>
          </div>
          <p className="AQ-count-text">Answered Questions</p>
        </div>
        <div className="count-container">
          <div className="AQ-count-unans AQ-center-count">
            <p>{unanswerdQuestion}</p>
          </div>
          <p className="AQ-count-unans-text">Unanswered Questions</p>
        </div>
      </div>
    )
  }

  renderQuestionsList = () => {
    const {questionsList} = this.state
    const questionsCount = new Array(10).fill().map((_, index) => index + 1)

    return (
      <div className="AP-questions-list-container">
        <div>
          <p className="AP-questions-list-container-heading">
            Questions ({questionsList.length})
          </p>
          <div className="AP-questions-list">
            {questionsCount.map(eachNum => (
              <div className="AP-questions-list-box" key={eachNum}>
                <p className="AP-questions-list-box-num">{eachNum}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="AP-submit-button-container">
          <button type="button" className="AP-submit-button">
            Submit Assessment
          </button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="page">
        <Header />
        <div className="assessment-container">
          {this.renderAssesmentContainer()}
          <div className="time-questions-container">
            <TimeLeft />
            <div className="AP-questions-container">
              {this.renderQuestionsStatus()}
              <hr className="count-question-separator" />
              {this.renderQuestionsList()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AssessmentPage
