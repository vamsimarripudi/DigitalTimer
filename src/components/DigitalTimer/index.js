import {Component} from 'react'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecrementButton = () => {
    const {timerInMinutes} = this.state
    if (timerInMinutes > 1) {
      this.setState(prevState => ({
        timerInMinutes: prevState.timerInMinutes - 1,
      }))
    }
  }

  onIncrementButton = () => {
    this.setState(prevState => ({
      timerInMinutes: prevState.timerInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timerInMinutes, timeElapsedInSeconds} = this.state
    const isButtonDisabled = timeElapsedInSeconds > 0

    return (
      <div>
        <p>Set Timer limit</p>
        <div>
          <button
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onDecrementButton}
          >
            -
          </button>
          <div>
            <p>{timerInMinutes}</p>
          </div>
          <button
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onIncrementButton}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  onIncrementTimeInSeconds = () => {
    const {timeElapsedInSeconds, timerInMinutes} = this.state
    const isTimeCompleted = timeElapsedInSeconds === timerInMinutes * 60

    if (isTimeCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeElapsedInSeconds, timerInMinutes} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.onIncrementTimeInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const isStartOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const isStartOrPauseImgAlt = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div>
        <button onClick={this.onStartOrPauseTimer} type="button">
          <img alt={isStartOrPauseImgAlt} src={isStartOrPauseImgUrl} />
          <h1>{isTimerRunning ? 'Pause' : 'Start'}</h1>
        </button>
        <button onClick={this.onResetTimer} type="button">
          <img
            alt="reset icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p>Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedInSeconds, timerInMinutes} = this.state

    const remainingSeconds = timerInMinutes * 60 - timeElapsedInSeconds

    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = Math.floor(remainingSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div>
        <h1>Digital Timer</h1>
        <div>
          <div>
            <div>
              <h1>{this.getElapsedSecondsInTimeFormat()}</h1>
              <p>{labelText}</p>
            </div>
          </div>
        </div>
        <div>
          {this.renderTimerController()}
          {this.renderTimerLimitController()}
        </div>
      </div>
    )
  }
}

export default DigitalTimer
