import getDataFromApiStat from './scripts/get-data-from-api-stat.js'
import dataApiDiseaseSh from './data/from-api-disease-sh.js';
import Graph from './scripts/chart.js';

const grafCovid = (dataObj) => {
  let buttons = document.querySelectorAll('.graph-container__buttons > button');
  let arrName = ['Cumulative Cases', 'Cumulative Deaths', 'Cumulative Recovers'];
  let arrData = ['cases', 'deaths', 'recovered', 'cases', 'deaths', 'recovered'];
  let index = 0;

  let values;
  let data;
  let x;

  function cumulativeHandler() {
    data = dataObj[arrData[index]];
    x = [];
    values = [];
    for (let elem in data) {
      x.push(elem);
      values.push(data[elem]);
    }
  }

  function dailyHandler() {
    data = dataObj[arrData[index]];
    x = [];
    values = [];
    for (let elem in data) {
      x.push(elem);
      values.push(data[elem]);
    }
    x.shift();

    console.log(values);

    let newValues = [];

    for (let i = 1; i < values.length; i += 1) {
      newValues[i] = values[i] - values[i - 1];
    }

    console.log(newValues);
  }
 
  cumulativeHandler();
  //dailyHandler();

  //console.log(x);
  //console.log(values);
  //console.log(index);

  let graph = new Graph();
  graph.initSize();
  graph.createGraph(x, values, 'line', arrName[index]);


  function buttonHandler() {
    document.querySelector('#myChart').innerHTML = '';

    if (this.innerHTML === 'Next') {
      index += 1;
      if (index === arrName.length) {
        index = 0;
      }
    }

    if (this.innerHTML === 'Prev') {
      index -= 1;
      if (index === -1) {
        index = arrName.length - 1;
      }
    }

    document.querySelector('.graph-container__title').innerHTML = arrName[index];
    
    cumulativeHandler()
    let graph = new Graph();
    graph.initSize();
    graph.createGraph(x, values, 'line', arrName[index]);
  }

  buttons.forEach(e => {
    e.addEventListener('click', buttonHandler);
  })
    
}

async function mainCovid() {
  // here put functions
  await getDataFromApiStat() // this must be before you take data from  {dataApiDiseaseSh}!
  console.log('mainCovid --->  dataApiDiseaseSh', dataApiDiseaseSh)
  grafCovid(dataApiDiseaseSh, 'italia');
}

mainCovid();
