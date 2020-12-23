import getDataFromApiStat from './scripts/get-data-from-api-stat.js'
import dataApiDiseaseSh from './data/from-api-disease-sh.js';
import Graph from './scripts/chart.js';
import Map from './scripts/map.js';

let mode = 'cases';

const grafCovid = () => {
  let x = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  let values = [10,9,8,7,6,5,4,3,2,1];
  let graph = new Graph();
  graph.initSize();
  graph.createGraph(x, values, 'bar', 'daily cases');
}

async function mainCovid() {
  // here put functions
  await getDataFromApiStat() // this must be before you take data from  {dataApiDiseaseSh}!
  console.log('mainCovid --->  dataApiDiseaseSh', dataApiDiseaseSh);
  new Map(dataApiDiseaseSh).renderMap(mode);
  grafCovid();

  document.body.querySelector('.btn-cases').addEventListener('click', ()=> {
    mode = 'cases';
    new Map(dataApiDiseaseSh).renderMap(mode);
  });
  document.body.querySelector('.btn-deaths').addEventListener('click', ()=> {
    mode = 'deaths';
    new Map(dataApiDiseaseSh).renderMap(mode);
  });
  document.body.querySelector('.btn-recovered').addEventListener('click', ()=> {
    mode = 'recovered';
    new Map(dataApiDiseaseSh).renderMap(mode);
  });
}

mainCovid();
