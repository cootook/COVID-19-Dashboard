import dataApiDiseaseSh from '../data/from-api-disease-sh.js';

export default function getTable() {
  // table heading
  const heading = document.createElement('h2')
  heading.classList.add('table--heading')
  const headingText = () => {
    return 'Global stat'
  }
  heading.innerText = `${headingText()}`

  // switcher cases for today or cumulative
  const switcherAllToday = document.createElement('label');
  const checkBoxAllToday = document.createElement('input');
  const switcherSliderAllToday = document.createElement('div');
  const switcherTextAll = document.createElement('div');
  const switcherTextToday = document.createElement('div');

  switcherAllToday.classList.add('switcher', 'switcher--mode_train');
  checkBoxAllToday.classList.add('switcher--check-box');
  switcherSliderAllToday.classList.add('switcher--slider', 'switcher--slider__all-today');
  switcherTextAll.classList.add('switcher--text', 'switcher--text__all')
  switcherTextToday.classList.add('switcher--text', 'switcher--text__today')
  switcherTextAll.innerText = 'all'
  switcherTextToday.innerText = 'today'

  checkBoxAllToday.setAttribute('type', 'checkbox');

  switcherAllToday.appendChild(checkBoxAllToday);
  switcherAllToday.appendChild(switcherSliderAllToday);
  switcherAllToday.appendChild(switcherTextAll);
  switcherAllToday.appendChild(switcherTextToday);

  // switcher cases in absolute or per 100k
  const switcherAbsPerHundred = document.createElement('label');
  const checkBoxAbsPerHundred = document.createElement('input');
  const switcherSliderAbsPerHundred = document.createElement('span');
  const switcherTextAbs = document.createElement('div');
  const switcherTextPerHundred = document.createElement('div');

  switcherAbsPerHundred.classList.add('switcher', 'switcher--mode_train');
  checkBoxAbsPerHundred.classList.add('switcher--check-box');
  switcherSliderAbsPerHundred.classList.add('switcher--slider', 'switcher--slider__abs-per');
  switcherTextAbs.classList.add('switcher--text', 'switcher--text__abs')
  switcherTextPerHundred.classList.add('switcher--text', 'switcher--text__per')
  switcherTextAbs.innerText = 'absolute'
  switcherTextPerHundred.innerText = 'per 100k'

  checkBoxAbsPerHundred.setAttribute('type', 'checkbox');

  switcherAbsPerHundred.appendChild(checkBoxAbsPerHundred);
  switcherAbsPerHundred.appendChild(switcherSliderAbsPerHundred);
  switcherAbsPerHundred.appendChild(switcherTextAbs);
  switcherAbsPerHundred.appendChild(switcherTextPerHundred);

  // put switchers in container
  const switchersAll = document.createElement('div')
  switchersAll.classList.add('switchers-all--container')
  switchersAll.appendChild(switcherAllToday)
  switchersAll.appendChild(switcherAbsPerHundred)

  // stat 
  const getStat = () => {
    const casesStat = dataApiDiseaseSh.world.cases.toLocaleString()
    const deathsStat = dataApiDiseaseSh.world.deaths.toLocaleString()
    const recoveredStat = dataApiDiseaseSh.world.recovered.toLocaleString()



    return [casesStat, deathsStat, recoveredStat]
  }
  const cases = document.createElement('div')
  const deaths = document.createElement('div')
  const recovered = document.createElement('div')
  cases.classList.add('stat--text', 'stat--text-cases')
  deaths.classList.add('stat--text', 'stat--text-deaths')
  recovered.classList.add('stat--text', 'stat--text-recovered')
  cases.innerText = `Cases ${getStat()[0]}`
  deaths.innerText = `Deaths ${getStat()[1]}`
  recovered.innerText = `Recovered ${getStat()[2]}`



  // put the results in the section
  const tableSection = document.querySelector('.table-container')


  tableSection.appendChild(heading)
  tableSection.appendChild(switchersAll)
  tableSection.appendChild(cases)
  tableSection.appendChild(deaths)
  tableSection.appendChild(recovered)





}