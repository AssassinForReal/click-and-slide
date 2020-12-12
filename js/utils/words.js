export const wordByGramaticalNumber = (number, wordList) => {
  return wordByGramaticalNumberEnglishAdapter(number, wordList)
}

const wordByGramaticalNumberEnglishAdapter = (number, wordList) => {
  if (number === 1 || number === -1) return wordList[0]
  return wordList[1]
}

export const ordinalNumber = (number) => {
  return ordinalNumberEnglishAdapter(number)
}

const ordinalNumberEnglishAdapter = (number) => {
  const abs = Math.abs(number)

  if (abs === 1) {
    return `${number}st`
  }

  if (abs === 2) {
    return `${number}nd`
  }

  if (abs === 3) {
    return `${number}rd`
  }

  return `${number}th`
}
