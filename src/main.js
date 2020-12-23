import getDataFromApiStat from './scripts/get-data-from-api-stat.js'
import dataApiDiseaseSh from './data/from-api-disease-sh.js';
import grafCovid from './scripts/graph.js';
import generateListFlagCountryCases from './scripts/generate-list-flag-country-cases.js'
import Map from './scripts/map.js';

// !!!************************************************
let mode = { // maybe you should use const?
  mainInfo: ['cases', 'deaths', 'recovered'],
  timeInterval: ['all', 'today'],
  mainAmount: ['all', 'per100K']
}
// !!!************************************************

async function mainCovid() {
  // here put functions
  await getDataFromApiStat() // this must be before you take data from  {dataApiDiseaseSh}!
  console.log('mainCovid --->  dataApiDiseaseSh', dataApiDiseaseSh);

  grafCovid(dataApiDiseaseSh, 'world');

  const list = new generateListFlagCountryCases();
  list.appendAll()
  //list.sortListByCases()

  // !!!************************************************
  // !!! Please, use imported function. And rename your class, Map is reserved key word of JS
  // !!!************************************************
  new Map(dataApiDiseaseSh).renderMap(mode);
  document.body.querySelector('.btn-cases').addEventListener('click', () => {
    new Map(dataApiDiseaseSh).renderMap(mode.mainInfo[0]);
  });
  document.body.querySelector('.btn-deaths').addEventListener('click', () => {
    new Map(dataApiDiseaseSh).renderMap(mode.mainInfo[1]);
  });
  document.body.querySelector('.btn-recovered').addEventListener('click', () => {
    new Map(dataApiDiseaseSh).renderMap(mode.mainInfo[2]);
  });
  // !!!************************************************


  

}

mainCovid();
