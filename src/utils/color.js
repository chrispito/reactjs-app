/* eslint-disable no-bitwise,no-plusplus */
const stringToHash = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
    hash &= hash
  }
  return hash
}

// Converts the hash to a random HEX string
export const hexColorFromString = (str) => {
  if (str.length === 0) {
    return '#ffffff'
  }

  const hash = stringToHash(str)
  let color = '#'
  let value = 0

  for (let i = 0; i < 3; i++) {
    value = (hash >> (i * 8)) & 255
    color += (`00${value.toString(16)}`).substr(-2)
  }
  return color
}
