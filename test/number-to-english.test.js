import numToEnglish from '../src/scripts/number-to-english.js';

// test cases vars
const one = 1
const two = 2
const seventySeven = 77
const magicNumber = 42 * 42 // =1764 or one thousand seven hundred sixty-four
const testCases1 = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
  30: 'thirty',
  40: 'forty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety',
};
const testCases2 = {
  10: 'ten',
  100: 'one hundred',
  1000: 'one thousand',
  1000000: 'one million',
  1000000000: 'one billion',
  1000000000000: 'one trillion',
  1000000000000000: 'one quadrillion',
  1000000000000000000: 'one quintillion',
};

describe('Method "toEnglish" of Number.prototype: ', () => {
  test('should not exist before calling numToEnglish', () => {
    expect(Number.prototype.toEnglish).toBeFalsy()
  })

  test('should be function after calling numToEnglish', () => {
    numToEnglish()
    expect(typeof Number.prototype.toEnglish).toBe('function')
  })

  test('should return string', () => {
    expect(typeof one.toEnglish()).toBe('string')
    expect(typeof two.toEnglish()).toBe('string')
    expect(typeof seventySeven.toEnglish()).toBe('string')
    expect(typeof magicNumber.toEnglish()).toBe('string')
  })

  test('should return number in english', () => {
    expect(magicNumber.toEnglish()).toBe('one thousand seven hundred sixty-four')
    for (const key in testCases1) {
      const testCase = Number(key)
      const shouldBe = testCases1[key]
      expect(testCase.toEnglish()).toBe(shouldBe)
    }
    for (const key in testCases2) {
      const testCase = Number(key)
      const shouldBe = testCases2[key]
      expect(testCase.toEnglish()).toBe(shouldBe)
    }
  })
})




