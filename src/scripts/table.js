import dataApiDiseaseSh from '../data/from-api-disease-sh.js';
import currentData from '../data/current-data-show.js';

export default class GetTable {
  constructor() {
    // str to speak
    GetTable.prototype.strToSpeak = 'no data';
    // table heading
    this.heading = document.createElement('h2')
    this.heading.classList.add('table--heading')
    this.heading.innerText = `${this.getHeadingText()}`
    this.heading.innerHTML += '<span class="material-icons listen-to">hearing</span>'
    this.heading.style.cursor = 'url(./assets/icons/volume.png) 4 12, auto'

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
    table.innerText = this.getHeadingText()
    table.innerHTML += '<span class="material-icons listen-to">hearing</span>'
    const currentStat = this.getStat()
    document.querySelector('.stat--text-cases').innerText = `Cases ${currentStat[0]}`
    document.querySelector('.stat--text-deaths').innerText = `Deaths ${currentStat[1]}`
    document.querySelector('.stat--text-recovered').innerText = `Recovered ${currentStat[2]}`
  }

  getHeadingText() {
    if (currentData.country === 'world') {
      const headingWorld = 'Global statistic ';
      GetTable.prototype.strToSpeak = headingWorld;
      return headingWorld;
    }
    const headingCountry = currentData.country;
    GetTable.prototype.strToSpeak = headingCountry;
    return `Statistic for ${headingCountry} `
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
      casesStat = dataApiDiseaseSh.world[pathCases]
      deathsStat = dataApiDiseaseSh.world[pathDeaths]
      recoveredStat = dataApiDiseaseSh.world[pathRecovered]
      GetTable.prototype.strToSpeak += ` there is ${casesStat.toEnglish()} total cases, ${deathsStat.toEnglish()} deaths and ${recoveredStat.toEnglish()} recovered.`
      return [casesStat, deathsStat, recoveredStat].map(x => x.toLocaleString())
    } else if (currentData.country === 'world') {
      const pop = dataApiDiseaseSh.world.population
      casesStat = (dataApiDiseaseSh.world[pathCases])
      deathsStat = (dataApiDiseaseSh.world[pathDeaths])
      recoveredStat = (dataApiDiseaseSh.world[pathRecovered])
      GetTable.prototype.strToSpeak += ` today there is ${casesStat.toEnglish()} cases, ${deathsStat.toEnglish()} deaths and ${recoveredStat.toEnglish()} recovered.`
      return [casesStat, deathsStat, recoveredStat].map(x => x.toLocaleString())
    }
    const currentCountry = dataApiDiseaseSh.countries.find(x => x.country === currentData.country)
    casesStat = currentCountry[pathCases]
    deathsStat = currentCountry[pathDeaths]
    recoveredStat = currentCountry[pathRecovered]
    GetTable.prototype.strToSpeak += ` there is ${casesStat.toEnglish()} cases, ${deathsStat.toEnglish()} deaths and ${recoveredStat.toEnglish()} recovered.`
    return [casesStat, deathsStat, recoveredStat].map(x => x.toLocaleString())
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
