import {Component} from 'react'
import Cookies from 'js-cookie'
import AssessmentQuestion from '../AssessmentQuestion'
import Header from '../Header'
import TimerAndSubmitComponent from '../TimerAndSubmitComponent'

import AssessmentContext from '../../context/AssessmentContext'

import './index.css'

class AssessmentPage extends Component {
  state = {questionsList: [], currentQuestion: 1, answersList: []}

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
      })
    }
  }

  changeCurrQuestion = quesNo => {
    this.setState({currentQuestion: quesNo})
  }

  updateAnswersList = (quesNo, isCorrect) => {
    this.setState(prevState => ({
      answersList: [...prevState.answersList, {quesNo, isCorrect}],
    }))
  }

  render() {
    const {questionsList, currentQuestion, answersList} = this.state
    console.log(answersList)
    return (
      <AssessmentContext.Provider
        value={{
          questionsList,
          currentQuestion,
          answersList,
          changeCurrQuestion: this.changeCurrQuestion,
          updateAnswersList: this.updateAnswersList,
        }}
      >
        <div className="page">
          <Header />
          <div className="assessment-container">
            <AssessmentQuestion />
            <TimerAndSubmitComponent />
          </div>
        </div>
      </AssessmentContext.Provider>
    )
  }
}

export default AssessmentPage
