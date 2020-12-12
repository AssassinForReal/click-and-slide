export const formatNumber = (number, digits) => {
  const digitCount = number === 0 ? 1 : Math.floor(Math.log10(number) + 1)
  let string = ''

  digits = Math.max(digitCount, digits)

  for (let i = 0; i < digits; i++) {
    const currentDigit = Math.floor(number / 10 ** (digits - i - 1)) % 10
    string += currentDigit.toString()
  }

  return string
}
