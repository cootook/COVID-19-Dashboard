import getDataFromApiStat from './scripts/get-data-from-api-stat.js';
import dataApiDiseaseSh from './data/from-api-disease-sh.js';
import grafCovid from './scripts/graph.js';
import GenerateListFlagCountryCases from './scripts/generate-list-flag-country-cases.js';
import Map from './scripts/map.js';
import CasesLustUpdate from './scripts/cases-lust-update.js';
import GetTable from './scripts/table.js';
import Listener from './scripts/listenerHandler.js';
import Search from './scripts/search.js';
import getVirtualKeyboard from './scripts/keyboard.js';
import numToEnglish from './scripts/number-to-english.js';

// !!!************************************************
const mode = {
  mainInfo: ['cases', 'deaths', 'recovered'],
  timeInterval: ['all', 'today'],
  mainAmount: ['all', 'per100K'],
};
// !!!************************************************

async function mainCovid() {
  // here put functions
  numToEnglish();
  await getDataFromApiStat(); // this must be before you take data from  {dataApiDiseaseSh}!

  console.log('mainCovid --->  dataApiDiseaseSh', dataApiDiseaseSh);

  grafCovid(dataApiDiseaseSh, 'world');

  const list = new GenerateListFlagCountryCases();
  list.appendAll();

  const infoSection = new CasesLustUpdate();
  infoSection.appendStatUpdate();

  new GetTable();
  getVirtualKeyboard();

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

  const listener = new Listener(dataApiDiseaseSh);
  listener.eventHandler();
  new Search();
}

mainCovid();
