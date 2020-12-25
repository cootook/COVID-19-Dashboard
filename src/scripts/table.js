import dataApiDiseaseSh from '../data/from-api-disease-sh.js';
import currentData from '../data/current-data-show.js';

export default class GetTable {
  constructor() {
    // table heading
    this.heading = document.createElement('h2')
    this.heading.classList.add('table--heading')
    this.heading.innerText = `${this.getHeadingText()}`

    // switcher cases for today or cumulative
    this.switcherAllToday = document.createElement('label');
    this.checkBoxAllToday = document.createElement('input');
    this.switcherSliderAllToday = document.createElement('div');
    this.switcherTextAll = document.createElement('div');
    this.switcherTextToday = document.createElement('div');

    this.switcherAllToday.classList.add('switcher', 'switcher--all-today');
    this.checkBoxAllToday.classList.add('switcher--check-box', 'switcher--check-box__all-today');
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

    this.switcherAbsPerHundred.classList.add('switcher', 'switcher--abs-per');
    this.checkBoxAbsPerHundred.classList.add('switcher--check-box', 'switcher--check-box__abs-per');
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

    this.cases = document.createElement('div')
    this.deaths = document.createElement('div')
    this.recovered = document.createElement('div')
    this.cases.classList.add('stat--text', 'stat--text-cases')
    this.deaths.classList.add('stat--text', 'stat--text-deaths')
    this.recovered.classList.add('stat--text', 'stat--text-recovered')
    const currentStat = this.getStat()
    this.cases.innerText = `Cases ${currentStat[0]}`
    this.deaths.innerText = `Deaths ${currentStat[1]}`
    this.recovered.innerText = `Recovered ${currentStat[2]}`

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
    document.querySelector('.table--heading').innerText = this.getHeadingText()
    const currentStat = this.getStat()
    document.querySelector('.stat--text-cases').innerText = `Cases ${currentStat[0]}`
    document.querySelector('.stat--text-deaths').innerText = `Deaths ${currentStat[1]}`
    document.querySelector('.stat--text-recovered').innerText = `Recovered ${currentStat[2]}`
  }

  getHeadingText() {
    if (currentData.country === 'world') return 'Global stat'
    return currentData.country
  }

  getStat() {
    let casesStat = null;
    let deathsStat = null;
    let recoveredStat = null;

    let pathCases = null;
    let pathDeaths = null;
    let pathRecovered = null;

    if (currentData.isAll) {
      pathCases = currentData.isAbs ? 'cases' : 'casesPerOneMillion'
      pathDeaths = currentData.isAbs ? 'deaths' : 'deathsPerOneMillion'
      pathRecovered = currentData.isAbs ? 'recovered' : 'recoveredPerOneMillion'
    } else {
      pathCases = 'todayCases'
      pathDeaths = 'todayDeaths'
      pathRecovered = 'todayRecovered'
    }


    if (currentData.country === 'world' && currentData.isAll) {
      casesStat = dataApiDiseaseSh.world[pathCases].toLocaleString()
      deathsStat = dataApiDiseaseSh.world[pathDeaths].toLocaleString()
      recoveredStat = dataApiDiseaseSh.world[pathRecovered].toLocaleString()
      return [casesStat, deathsStat, recoveredStat]
    } else if (currentData.country === 'world') {
      const pop = dataApiDiseaseSh.world.population
      casesStat = (dataApiDiseaseSh.world[pathCases]).toLocaleString()
      deathsStat = (dataApiDiseaseSh.world[pathDeaths]).toLocaleString()
      recoveredStat = (dataApiDiseaseSh.world[pathRecovered]).toLocaleString()
      return [casesStat, deathsStat, recoveredStat]
    }
    const currentCountry = dataApiDiseaseSh.countries.find(x => x.country === currentData.country)
    casesStat = currentCountry[pathCases].toLocaleString()
    deathsStat = currentCountry[pathDeaths].toLocaleString()
    recoveredStat = currentCountry[pathRecovered].toLocaleString()
    return [casesStat, deathsStat, recoveredStat]
  }

  switchAllToday(e) {
    currentData.isAll = currentData.isAll ? false : true;
    GetTable.prototype.tableRefresh()
  }

  switchAbsPer(e) {
    currentData.isAbs = currentData.isAbs ? false : true;
    GetTable.prototype.tableRefresh()
  }
} 
