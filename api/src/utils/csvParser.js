const HEX_REGEX = /^[0-9a-fA-F]{32}$/

function isValidNumber (value) {
  if (value === null || value === undefined) return false
  if (value === '') return false

  const number = Number(value)
  return Number.isFinite(number)
}

function parseCsvLine (line) {
  const parts = line.split(',')

  if (parts.length !== 4) return null

  const [, text, number, hex] = parts

  if (!text) return null
  if (!isValidNumber(number)) return null
  if (!HEX_REGEX.test(hex)) return null

  return {
    text,
    number: Number(number),
    hex
  }
}

function parseCsvContent (csvContent, fileName) {
  if (!csvContent || typeof csvContent !== 'string') {
    return []
  }

  const lines = csvContent.split('\n')
  
  // Remove header
  lines.shift()

  const result = []

  for (const line of lines) {
    if (!line.trim()) continue

    const parsed = parseCsvLine(line)
    if (parsed) {
      result.push(parsed)
    }
  }

  return result
}

module.exports = {
  parseCsvContent,
  parseCsvLine,
  isValidNumber
}