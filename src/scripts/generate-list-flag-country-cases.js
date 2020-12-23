import dataApiDiseaseSh from '../data/from-api-disease-sh.js';

export default class generateListFlagCountryCases {

  constructor() {
    const { countries } = dataApiDiseaseSh;



    this.listHeading = document.createElement('h2')
    const listHeadingSorBy = document.createElement('div')
    listHeadingSorBy.innerText = 'Sort by '
    const listHeadingCountry = document.createElement('div')
    listHeadingCountry.innerText = 'country'
    const listHeadingCases = document.createElement('div')
    listHeadingCases.innerText = 'cases'
    this.listHeading.appendChild(listHeadingSorBy)
    this.listHeading.appendChild(listHeadingCountry)
    this.listHeading.appendChild(listHeadingCases)
    this.listHeading.classList.add('list-container--heading')

    this.listInputSearch = document.createElement('input')
    this.listInputSearch.classList.add('list-container--search')
    this.listInputSearch.setAttribute('type', 'search')
    this.listInputSearch.setAttribute('name', 'search')
    this.listInputSearch.setAttribute('placeholder', 'Search by Country')

    this.listUl = document.createElement('ul') // use as a container for the list

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
      listCountryCase.innerText = cases

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

  sortList() {
    const listContainer = document.querySelector('.list-container')
    const arrList = document.querySelectorAll('.list-container--ul__item')
    arrList.forEach(x => {
      x.remove()
      console.log(Number(x.dataset.cases))
    })
    const temp = Array.prototype.slice.call(arrList, 0)
    temp.sort((x, y) => {
      //return Number(x.dataset.cases) - Number(y.dataset.cases)
      return Number(y.dataset.cases) - Number(x.dataset.cases)

    })
    temp.forEach(x => {
      listContainer.appendChild(x)
    })
  }


}