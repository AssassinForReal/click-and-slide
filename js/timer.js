import { formatTime } from './utils/time.js'

const DIGIT_SCALE = 0.8
const DIGIT_WIDTH = Math.round(24 * DIGIT_SCALE)
const DIGIT_HEIGHT = Math.round(42 * DIGIT_SCALE)

export const renderTimer = (time) => {
  const {
    hours,
    minutes,
    seconds,
    milliseconds
  } = formatTime(time)

  const images = [
    ...renderNumber(hours, 2),
    renderColon(),
    ...renderNumber(minutes, 2),
    renderColon(),
    ...renderNumber(seconds, 2),
    renderDot(),
    ...renderNumber(milliseconds, 3)
  ]
  return images
}

export const renderNumber = (number, digits) => {
  const images = []
  const digitCount = number === 0 ? 1 : Math.floor(Math.log10(number) + 1)

  digits = Math.max(digitCount, digits)

  for (let i = 0; i < digits; i++) {
    const currentDigit = Math.floor(number / 10 ** (digits - i - 1)) % 10

    const hImage = document.createElement('img')
    hImage.src = `images/digits/${currentDigit}.png`
    hImage.alt = currentDigit
    hImage.width = DIGIT_WIDTH
    hImage.height = DIGIT_HEIGHT
    images.push(hImage)
  }

  return images
}

const renderColon = () => {
  const hImage = document.createElement('img')
  hImage.src = `images/digits/colon.png`
  hImage.alt = ':'
  hImage.width = DIGIT_WIDTH
  hImage.height = DIGIT_HEIGHT
  return hImage
}

const renderDot = () => {
  const hImage = document.createElement('img')
  hImage.src = `images/digits/dot.png`
  hImage.alt = '.'
  hImage.width = DIGIT_WIDTH
  hImage.height = DIGIT_HEIGHT
  return hImage
}