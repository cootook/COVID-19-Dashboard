import getDataFromApiStat from './scripts/get-data-from-api-stat.js'
import dataApiDiseaseSh from './data/from-api-disease-sh.js';
import grafCovid from './scripts/graph.js';
import generateListFlagCountryCases from './scripts/generate-list-flag-country-cases.js'
import Map from './scripts/map.js';
import CasesLustUpdate from './scripts/cases-lust-update.js'

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

  const infoSection = new CasesLustUpdate()
  infoSection.appendStatUpdate()

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

  window.alert(`
  Приветствуем тебя, дорогой друг!
Если ты читаешь это сообщение, значит, мы еще не завершили работу над приложением. 
Если возможно, отложи проверку или оставь контакты при кроссчеке, чтоб можно было 
связаться по завершинию таска. 
Заранее благодарим! 
          Dear friend!
We have not finished our work yet. So if it is possible,
please do the cross-check a little lately or give your contacts
in feedback. 
Thanks a lot, we really appreciate that.`)


}

mainCovid();
