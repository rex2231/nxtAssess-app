import {Component} from 'react'
import TimeLeft from '../TimeLeft'
import AssessmentContext from '../../context/AssessmentContext'

class TimerAndSubmitComponent extends Component {
  renderQuestionsStatus = () => (
    <AssessmentContext.Consumer>
      {value => {
        const {questionsList} = value
        return (
          <div className="AP-questions-count">
            <div className="count-container">
              <div className="AQ-count-ans AQ-center-count">
                <p>0</p>
              </div>
              <p className="AQ-count-text">Answered Questions</p>
            </div>
            <div className="count-container">
              <div className="AQ-count-unans AQ-center-count">
                <p>{questionsList.length}</p>
              </div>
              <p className="AQ-count-unans-text">Unanswered Questions</p>
            </div>
          </div>
        )
      }}
    </AssessmentContext.Consumer>
  )

  renderQuestionsList = () => {
    const questionsCount = new Array(10).fill().map((_, index) => index + 1)
    return (
      <AssessmentContext.Consumer>
        {value => {
          const {questionsList, changeCurrQuestion} = value
          const onQuestionNav = event => {
            if (event.target.id !== '') {
              changeCurrQuestion(event.target.id)
            }
          }
          return (
            <div className="AP-questions-list-container">
              <div>
                <p className="AP-questions-list-container-heading">
                  Questions ({questionsList.length})
                </p>
                <div className="AP-questions-list">
                  {questionsCount.map(eachNum => (
                    <button
                      className="AP-questions-list-box"
                      type="button"
                      key={eachNum}
                      id={eachNum}
                      onClick={onQuestionNav}
                    >
                      <p className="AP-questions-list-box-num">{eachNum}</p>
                    </button>
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
        }}
      </AssessmentContext.Consumer>
    )
  }

  render() {
    return (
      <div className="time-questions-container">
        <TimeLeft />
        <div className="AP-questions-container">
          {this.renderQuestionsStatus()}
          <hr className="count-question-separator" />
          {this.renderQuestionsList()}
        </div>
      </div>
    )
  }
}

export default TimerAndSubmitComponent
