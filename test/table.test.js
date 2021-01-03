import GetTable, { getHeadingText, getStat } from '../src/scripts/table.js';
import dataApiDiseaseSh from '../src/data/from-api-disease-sh.js';

describe("Stat and class GetTable: ", () => {
  const testingInstance = new GetTable()

  test('Should be 16 elements in table container ', () => {
    expect(testingInstance.tableSection.getElementsByTagName('*').length).toBe(16)
  })

  test('All data from API should be obj', () => {
    expect(typeof dataApiDiseaseSh.countriesHistory).toBe('object')
    expect(typeof dataApiDiseaseSh.worldHistory).toBe('object')
    expect(typeof dataApiDiseaseSh.countries).toBe('object')
    expect(typeof dataApiDiseaseSh.world).toBe('object')
  })

  test('Should return str ', () => {
    expect(typeof getHeadingText()).toBe('string')
  })

  test('Should return arr length = 3', () => {
    expect(Array.isArray(getStat())).toBe(true)
    expect(getStat().length).toBe(3)
  })

})