import {Component} from 'react'
import {FaExclamationCircle} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import AssessmentContext from '../../context/AssessmentContext'

class AssessmentQuestion extends Component {
  state = {
    questionsList: [],
    currentQuestion: 1,
    unanswerdQuestion: 0,
    answerdQuestionsList: [],
    selectedOption: '',
    Assessmentstatus: [],
    currentQuestionStatus: '',
  }

  changeCurrQuestion = event => {
    this.setState({currentQuestion: event.target.id})
  }

  addScore = event => {
    const isCorrect = event.target.value
    this.setState({currentQuestionStatus: isCorrect})
  }

  renderAssesmentContainer = () => {
    const {selectedOption} = this.state
    return (
      <AssessmentContext.Consumer>
        {value => {
          const {
            updateAnswersList,
            changeCurrQuestion,
            currentQuestion,
            questionsList,
          } = value
          const question = questionsList[currentQuestion - 1]
          const onNextQuestion = () => {
            changeCurrQuestion(currentQuestion + 1)
          }
          const onUpdateAnswersList = event => {
            updateAnswersList(currentQuestion, event.target.value)
          }
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
                          onChange={onUpdateAnswersList}
                        >
                          <input
                            type="radio"
                            key={option.id}
                            onChange={this.addScore}
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
                      <select
                        className="select-options-container"
                        onChange={this.addScore}
                      >
                        {question.options.map((option, index) => (
                          <option
                            value={option.isCorrect}
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
                            onChange={this.addScore}
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
                  {currentQuestion < questionsList.length - 1 &&
                    question.optionsType === 'SINGLE_SELECT' && (
                      <div className="single-select-note-container">
                        <FaExclamationCircle className="single-select-note-icon" />
                        <p>First option is selected by default</p>
                      </div>
                    )}
                  {currentQuestion < questionsList.length && (
                    <button
                      type="button"
                      className="next-question-button"
                      onClick={onNextQuestion}
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
        }}
      </AssessmentContext.Consumer>
    )
  }

  render() {
    return this.renderAssesmentContainer()
  }
}

export default AssessmentQuestion
