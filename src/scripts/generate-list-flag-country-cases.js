import dataApiDiseaseSh from '../data/from-api-disease-sh.js';

export default class GenerateListFlagCountryCases {

  constructor() {
    const { countries, countriesHistory } = dataApiDiseaseSh;
    GenerateListFlagCountryCases.prototype.sortedByCases = '1-2'
    GenerateListFlagCountryCases.prototype.sortedByCountries = 'a-b'



    this.listHeading = document.createElement('h2')
    const listHeadingSorBy = document.createElement('div')
    listHeadingSorBy.innerText = 'Sort by '
    const listHeadingCountry = document.createElement('div')
    listHeadingCountry.innerText = 'country'
    listHeadingCountry.style.cursor = 'pointer'
    listHeadingCountry.addEventListener('click', this.sortListByCountries)
    const listHeadingCases = document.createElement('div')
    listHeadingCases.style.display = 'flex'
    listHeadingCases.style.cursor = 'pointer'
    listHeadingCases.innerText = 'cases'
    const btnSortedByCases = document.createElement('span')
    btnSortedByCases.classList.add('list-container--btn__sort-by-cases')
    btnSortedByCases.innerText = ' ^ '
    listHeadingCases.addEventListener('click', this.sortListByCases)
    this.listHeading.appendChild(listHeadingSorBy)
    this.listHeading.appendChild(listHeadingCountry)
    this.listHeading.appendChild(listHeadingCases)
    listHeadingCases.appendChild(btnSortedByCases)
    this.listHeading.classList.add('list-container--heading')

    this.listInputSearch = document.createElement('input')
    this.listInputSearch.classList.add('list-container--search')
    this.listInputSearch.setAttribute('type', 'search')
    this.listInputSearch.setAttribute('name', 'search')
    this.listInputSearch.setAttribute('placeholder', 'Search by Country')

    this.listUl = document.createElement('ul') // use as a container for the list

    for (let i = countries.length - 1; i >= 0; i--) {

      const nameInCountries = countries[i].country;
      const isIn = countriesHistory.some(c => c.country === nameInCountries)
      if (!isIn) {
        countries.splice(i, 1)
      }

    }

    this.arrListOfCountries = countries.map((item) => {
      {
        //   "country":"Afghanistan",
        //   "countryInfo":
        //     {
        //       "flag":"https://disease.sh/assets/img/flags/af.png"
        //     },
        //   "cases":50677,
        //   "todayCases":141,
        //   "deaths":2110,
        //   "todayDeaths":56,
        //   "recovered":39158,
        //   "todayRecovered":359,
        //   "casesPerOneMillion":1288,
        //   "deathsPerOneMillion":54,
        //   "recoveredPerOneMillion":995.54,
        //   "population":39333612,
      }
      const {
        country,
        cases,
        todayCases,
        deaths,
        todayDeaths,
        recovered,
        todayRecovered,
        casesPerOneMillion,
        deathsPerOneMillion,
        recoveredPerOneMillion,
        population
      } = item
      const flag = item.countryInfo.flag;

      const listLi = document.createElement('li')
      listLi.classList.add('list-container--ul__item')
      listLi.dataset.country = country
      listLi.dataset.cases = cases

      const countryLogo = document.createElement('div')
      countryLogo.classList.add('country-logo')
      countryLogo.style.background = `center/contain url(${flag}) no-repeat`

      const listCountryName = document.createElement('span')
      listCountryName.classList.add('country-name')
      listCountryName.innerText = country

      const listCountryCase = document.createElement('span')
      listCountryCase.classList.add('number')
      listCountryCase.innerText = cases.toLocaleString()



      listLi.appendChild(countryLogo)
      listLi.appendChild(listCountryName)
      listLi.appendChild(listCountryCase)
      this.listUl.appendChild(listLi)

      return listLi;
    });
  }

  appendAll() {
    const listContainer = document.querySelector('.list-container')
    listContainer.appendChild(this.listHeading)
    listContainer.appendChild(this.listInputSearch)
    listContainer.appendChild(this.listUl)
  }

  sortListByCases() {
    const btnSort = document.querySelector('.list-container--btn__sort-by-cases')
    const listContainer = document.querySelector('.list-container > ul')
    const arrList = document.querySelectorAll('.list-container--ul__item')
    btnSort.classList.toggle('list-container--btn__sort-by-cases--up')
    arrList.forEach(x => {
      x.remove()
    })
    const temp = Array.prototype.slice.call(arrList, 0)

    if (GenerateListFlagCountryCases.prototype.sortedByCases === '2-1') {
      GenerateListFlagCountryCases.prototype.sortedByCases = '1-2'
      temp.sort((x, y) => Number(x.dataset.cases) - Number(y.dataset.cases))
    } else {
      GenerateListFlagCountryCases.prototype.sortedByCases = '2-1'
      temp.sort((x, y) => Number(y.dataset.cases) - Number(x.dataset.cases))
    }
    temp.forEach(x => {
      listContainer.appendChild(x)
    })
  }

  sortListByCountries() {
    const listContainer = document.querySelector('.list-container > ul')
    const arrList = document.querySelectorAll('.list-container--ul__item')
    arrList.forEach(x => {
      x.remove()
    })
    const temp = Array.prototype.slice.call(arrList, 0)

    if (GenerateListFlagCountryCases.prototype.sortedByCountries === 'a-b') {
      GenerateListFlagCountryCases.prototype.sortedByCountries = 'b-a'
      temp.sort((x, y) => {

        const xCountry = x.dataset.country.toLowerCase()
        const yCountry = y.dataset.country.toLowerCase()
        if (xCountry < yCountry) return -1
        else return 1
      })
    } else {
      GenerateListFlagCountryCases.prototype.sortedByCountries = 'a-b'
      temp.sort((x, y) => {
        const xCountry = x.dataset.country.toLowerCase()
        const yCountry = y.dataset.country.toLowerCase()
        if (xCountry > yCountry) return -1
        else return 1
      })
    }
    temp.forEach(x => {
      listContainer.appendChild(x)
    })
  }
}
