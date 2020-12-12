import { base64decodeURI, base64encodeURI } from './utils/encoding.js'

const MAX_COOKIE_SIZE = 4096

export const loadScoresFromCookies = () => {
  const cookies = document.cookie.split(';')

  let scores = {}

  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === 'scores') {
      try {
        scores = JSON.parse(base64decodeURI(value))
      } catch { }
    }
  }

  return scores
}

export const storeScoresInCookies = (scores) => {
  const date = new Date()
  const year = 1000 * 60 * 60 * 24 * 365
  const encodedScores = base64encodeURI(JSON.stringify(scores))
  date.setTime(date.getTime() + 10 * year)
  const cookie = `scores=${encodedScores};expires=${date.toUTCString()}`

  if (cookie.length > MAX_COOKIE_SIZE) {
    throw {
      title: 'Could not save scores in browser cookies',
      message: 'Maximum cookie size exceeded'
    }
  }

  document.cookie = cookie
}

export const saveScore = ({ category, puzzle, mode, nickname, score }) => {
  const scores = loadScoresFromCookies()

  if (!scores[category]) {
    scores[category] = {}
  }

  if (!scores[category][puzzle]) {
    scores[category][puzzle] = {}
  }

  if (!scores[category][puzzle][mode]) {
    scores[category][puzzle][mode] = []
  }

  const scoreId = scores[category][puzzle][mode].length

  scores[category][puzzle][mode].push({
    id: scoreId,
    nickname, score,
    createdAt: new Date().getTime()
  })

  storeScoresInCookies(scores)
  return scoreId
}

export const getScores = ({ category, puzzle, mode }) => {
  const scores = loadScoresFromCookies()

  if (!scores[category]) {
    return []
  }

  if (!scores[category][puzzle]) {
    return []
  }

  if (!scores[category][puzzle][mode]) {
    return []
  }

  return scores[category][puzzle][mode]
}

export const getHighScores = ({ category, puzzle, mode }) => {
  const scores = getScores({ category, puzzle, mode })

  return scores.sort((score1, score2) => {
    if (score1.score < score2.score) return -1
    if (score1.score > score2.score) return 1
    return 0
  })
}
