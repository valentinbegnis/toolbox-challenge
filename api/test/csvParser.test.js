const { expect } = require('chai')

const {
  parseCsvContent,
  parseCsvLine,
  isValidNumber
} = require('../src/utils/csvParser')

describe('csvParser utils', () => {
  describe('isValidNumber', () => {
    it('returns true for valid numbers', () => {
      expect(isValidNumber('10')).to.equal(true)
      expect(isValidNumber('0')).to.equal(true)
      expect(isValidNumber('3.14')).to.equal(true)
    })

    it('returns false for invalid numbers', () => {
      expect(isValidNumber('')).to.equal(false)
      expect(isValidNumber('abc')).to.equal(false)
      expect(isValidNumber(null)).to.equal(false)
      expect(isValidNumber(undefined)).to.equal(false)
    })
  })

  describe('parseCsvLine', () => {
    it('parses a valid CSV line', () => {
      const line = 'test2.csv,ZnuBeR,321,6ff400377d841ca34f69cf219c283eef'

      const result = parseCsvLine(line)

      expect(result).to.deep.equal({
        text: 'ZnuBeR',
        number: 321,
        hex: '6ff400377d841ca34f69cf219c283eef'
      })
    })

    it('returns null if column count is invalid', () => {
      const line = 'test1.csv,ZnuBeR,32100000'
      expect(parseCsvLine(line)).to.equal(null)
    })

    it('returns null if number is invalid', () => {
      const line = 'test1.csv,ZnuBeR,NaN,6ff400377d841ca34f69cf219c283eef'
      expect(parseCsvLine(line)).to.equal(null)
    })

    it('returns null if hex is invalid', () => {
      const line = 'test1.csv,ZnuBeR,321,invalidhex'
      expect(parseCsvLine(line)).to.equal(null)
    })
  })

  describe('parseCsvContent', () => {
    it('returns empty array for empty content', () => {
      expect(parseCsvContent('')).to.deep.equal([])
    })

    it('parses only valid lines and ignores invalid ones', () => {
      const csv = `
        file,text,number,hex
        test1.csv,BADLINE
        test2.csv,ZnuBeR,321,6ff400377d841ca34f69cf219c283eef
        test3.csv,d,notanumber,f9e1bcdb9e3784acc448af34f4727252
        test4.csv,XKOtzV,40,e8b32583679fb86ad1cce49675761c7d
      `

      const result = parseCsvContent(csv)

      expect(result).to.have.lengthOf(2)

      expect(result[0]).to.deep.equal({
        text: 'ZnuBeR',
        number: 321,
        hex: '6ff400377d841ca34f69cf219c283eef'
      })

      expect(result[1]).to.deep.equal({
        text: 'XKOtzV',
        number: 40,
        hex: 'e8b32583679fb86ad1cce49675761c7d'
      })
    })
  })
})
