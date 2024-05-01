import {Component} from 'react'
import './index.css'

class TimeLeft extends Component {
  state = {timeLeft: 10 * 60}

  componentDidMount() {
    this.timerId = setInterval(this.countDown, 1000)
  }

  countDown = () => {
    this.setState(prevState => ({timeLeft: prevState.timeLeft - 1}))
  }

  click = () => {
    clearInterval(this.timerId)
  }

  formatTime = seconds => {
    const hours = Math.floor(seconds / 3600)
    const remainingMinutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    return `${hours
      .toString()
      .padStart(2, '0')}:${remainingMinutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  render() {
    const {timeLeft} = this.state
    if (timeLeft === 0) {
      clearInterval(this.timerId)
    }

    return (
      <div className="TimeLeft-container">
        <div>
          <p className="time-left-heading">Time Left</p>
        </div>
        <div>
          <p className="countdown">{this.formatTime(timeLeft)}</p>
        </div>
      </div>
    )
  }
}

export default TimeLeft
