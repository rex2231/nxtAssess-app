import React from 'react'

const AssessmentContext = React.createContext({
  questionsList: [],
  currentQuestion: 1,
  changeCurrQuestion: () => {},
  answersList: [],
  updateAnswersList: () => {},
})

export default AssessmentContext
