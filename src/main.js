import getDataFromApiStat from './scripts/get-data-from-api-stat.js'
import dataApiDiseaseSh from './data/from-api-disease-sh.js';
import Graph from './scripts/chart.js';
import generateListFlagCountryCases from './scripts/generate-list-flag-country-cases.js'
import Map from './scripts/map.js';

// !!!************************************************
let mode = { // maybe you should use const?
  mainInfo: ['cases', 'deaths', 'recovered'],
  timeInterval: ['all', 'today'],
  mainAmount: ['all', 'per100K']
}
// !!!************************************************


const grafCovid = () => {
  let x = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  let values = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  let graph = new Graph();
  graph.initSize();
  graph.createGraph(x, values, 'bar', 'daily cases');
}

async function mainCovid() {
  // here put functions
  await getDataFromApiStat() // this must be before you take data from  {dataApiDiseaseSh}!
  console.log('mainCovid --->  dataApiDiseaseSh', dataApiDiseaseSh);
  
  grafCovid();
  
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
