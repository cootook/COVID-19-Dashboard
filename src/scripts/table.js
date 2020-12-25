import dataApiDiseaseSh from '../data/from-api-disease-sh.js';

export default class GetTable {
  constructor() {
    // table heading
    this.heading = document.createElement('h2')
    this.heading.classList.add('table--heading')
    const headingText = () => {
      return 'Global stat'
    }
    this.heading.innerText = `${headingText()}`

    // switcher cases for today or cumulative
    this.switcherAllToday = document.createElement('label');
    this.checkBoxAllToday = document.createElement('input');
    this.switcherSliderAllToday = document.createElement('div');
    this.switcherTextAll = document.createElement('div');
    this.switcherTextToday = document.createElement('div');

    this.switcherAllToday.classList.add('switcher', 'switcher--mode_train');
    this.checkBoxAllToday.classList.add('switcher--check-box');
    this.switcherSliderAllToday.classList.add('switcher--slider', 'switcher--slider__all-today');
    this.switcherTextAll.classList.add('switcher--text', 'switcher--text__all')
    this.switcherTextToday.classList.add('switcher--text', 'switcher--text__today')
    this.switcherTextAll.innerText = 'all'
    this.switcherTextToday.innerText = 'today'

    this.checkBoxAllToday.setAttribute('type', 'checkbox');

    this.switcherAllToday.appendChild(this.checkBoxAllToday);
    this.switcherAllToday.appendChild(this.switcherSliderAllToday);
    this.switcherAllToday.appendChild(this.switcherTextAll);
    this.switcherAllToday.appendChild(this.switcherTextToday);

    // switcher cases in absolute or per 100k
    this.switcherAbsPerHundred = document.createElement('label');
    this.checkBoxAbsPerHundred = document.createElement('input');
    this.switcherSliderAbsPerHundred = document.createElement('span');
    this.switcherTextAbs = document.createElement('div');
    this.switcherTextPerHundred = document.createElement('div');

    this.switcherAbsPerHundred.classList.add('switcher', 'switcher--mode_train');
    this.checkBoxAbsPerHundred.classList.add('switcher--check-box');
    this.switcherSliderAbsPerHundred.classList.add('switcher--slider', 'switcher--slider__abs-per');
    this.switcherTextAbs.classList.add('switcher--text', 'switcher--text__abs')
    this.switcherTextPerHundred.classList.add('switcher--text', 'switcher--text__per')
    this.switcherTextAbs.innerText = 'absolute'
    this.switcherTextPerHundred.innerText = 'per 1 million'

    this.checkBoxAbsPerHundred.setAttribute('type', 'checkbox');

    this.switcherAbsPerHundred.appendChild(this.checkBoxAbsPerHundred);
    this.switcherAbsPerHundred.appendChild(this.switcherSliderAbsPerHundred);
    this.switcherAbsPerHundred.appendChild(this.switcherTextAbs);
    this.switcherAbsPerHundred.appendChild(this.switcherTextPerHundred);

    // put switchers in container
    this.switchersAll = document.createElement('div')
    this.switchersAll.classList.add('switchers-all--container')
    this.switchersAll.appendChild(this.switcherAllToday)
    this.switchersAll.appendChild(this.switcherAbsPerHundred)

    // stat 
    const getStat = () => {
      const casesStat = dataApiDiseaseSh.world.cases.toLocaleString()
      const deathsStat = dataApiDiseaseSh.world.deaths.toLocaleString()
      const recoveredStat = dataApiDiseaseSh.world.recovered.toLocaleString()
      return [casesStat, deathsStat, recoveredStat]
    }
    this.cases = document.createElement('div')
    this.deaths = document.createElement('div')
    this.recovered = document.createElement('div')
    this.cases.classList.add('stat--text', 'stat--text-cases')
    this.deaths.classList.add('stat--text', 'stat--text-deaths')
    this.recovered.classList.add('stat--text', 'stat--text-recovered')
    this.cases.innerText = `Cases ${getStat()[0]}`
    this.deaths.innerText = `Deaths ${getStat()[1]}`
    this.recovered.innerText = `Recovered ${getStat()[2]}`

    // put the results in the section
    this.tableSection = document.querySelector('.table-container')
    this.tableSection.appendChild(this.heading)
    this.tableSection.appendChild(this.switchersAll)
    this.tableSection.appendChild(this.cases)
    this.tableSection.appendChild(this.deaths)
    this.tableSection.appendChild(this.recovered)
  }

  tableRefresh() {
    const table = document.querySelector('.table--heading')
  }
} 
