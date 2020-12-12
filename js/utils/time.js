import { joinArray } from './arrays.js'
import { formatNumber } from './number.js'
import { wordByGramaticalNumber } from './words.js'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE

export const formatTime = (time) => {
  const hours = Math.floor(time / HOUR)
  const minutes = Math.floor(time / MINUTE) % 60
  const seconds = Math.floor(time / SECOND) % 60
  const milliseconds = time % 1000
  return { hours, minutes, seconds, milliseconds }
}

export const formatTimeString = (time) => {
  const { hours, minutes, seconds, milliseconds } = formatTime(time)
  const hoursString = formatNumber(hours, 2)
  const minutesString = formatNumber(minutes, 2)
  const secondsString = formatNumber(seconds, 2)
  const millisecondsString = formatNumber(milliseconds, 3)
  return `${hoursString}:${minutesString}:${secondsString}.${millisecondsString}`
}

export const formatTimeStringEnglish = (time) => {
  const { hours, minutes, seconds, milliseconds } = formatTime(time)

  const timeArray = []

  if (hours > 0) {
    timeArray.push(`${hours} ${wordByGramaticalNumber(hours, ['hour', 'hours'])}`)
  }

  if (minutes > 0) {
    timeArray.push(`${minutes} ${wordByGramaticalNumber(minutes, ['minute', 'minutes'])}`)
  }

  if (seconds > 0) {
    timeArray.push(`${seconds} ${wordByGramaticalNumber(seconds, ['second', 'seconds'])}`)
  }

  if (milliseconds > 0) {
    timeArray.push(`${milliseconds} ${wordByGramaticalNumber(milliseconds, ['millisecond', 'milliseconds'])}`)
  }

  return joinArray(timeArray, ', ', ' and ');
}

export const formatDate = (time) => {
  const date = new Date(time)
  return date.toLocaleDateString()
}
