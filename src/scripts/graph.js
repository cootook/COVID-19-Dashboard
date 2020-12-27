import Graph from './chart.js';

export default function grafCovid(dataObj, word) {
  if (word === 'world') {
    dataObj = dataObj.worldHistory;
  } else {
    let newData;
    dataObj.countriesHistory.forEach((e, i) => {
      if (e.country === word) {
        newData = dataObj.countriesHistory[i].timeline;
      }
    });
    dataObj = newData;
  }

  const graph = new Graph();
  graph.initSize();
  const buttons = document.querySelectorAll('.graph-container__buttons > button');
  const arrName = ['Cumulative Cases', 'Cumulative Deaths', 'Cumulative Recovered', 'Daily Cases', 'Daily Deaths', 'Daily Recovered'];
  const arrData = ['cases', 'deaths', 'recovered', 'cases', 'deaths', 'recovered'];
  let index = 0;
  let type = 'line';

  let values;
  let data;
  let x;

  function createGraph() {
    graph.update();
    graph.createGraph(x, values, type, arrName[index]);
  }

  function cumulativeHandler() {
    type = 'line';
    data = dataObj[arrData[index]];
    x = [];
    values = [];
    for (const elem in data) {
      x.push(elem);
      values.push(data[elem]);
    }
  }

  function dailyHandler() {
    type = 'bar';
    data = dataObj[arrData[index]];
    x = [];
    values = [];
    for (const elem in data) {
      x.push(elem);
      values.push(data[elem]);
    }
    const newValues = [];

    for (let i = 1; i < values.length; i += 1) {
      newValues[i] = values[i] - values[i - 1];
      if (newValues[i] < 0) {
        // console.log(values);
      }
    }

    values = newValues;
  }

  cumulativeHandler();
  createGraph();

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

    if (index > 2) {
      dailyHandler();
    } else {
      cumulativeHandler();
    }

    createGraph();
  }

  buttons.forEach((e) => {
    e.addEventListener('click', buttonHandler);
  });
}
