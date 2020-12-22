import dataApiDiseaseSh from '../data/from-api-disease-sh.js';

export default function generateListFlagCountryCases() {
  // <section class="list-container" id="list-container">
  //   <h2  class="list-container--heading">Country Cases</h2>
  //   <input type="search" name="search" id="search" placeholder="Search by Country">
  //   <ul>
  //       <li>
  //           <div class="country-logo"></div>
  //           <span class="country-name">Country1</span><span class="number">12 345 678</span>
  //       </li>
  //       <li>
  //           <div class="country-logo"></div>
  //           <span class="country-name">Country2</span><span class="number">12 345 678</span>
  const { countries } = dataApiDiseaseSh;

  const listContainer = document.querySelector('.list-container')

  const listHeading = document.createElement('h2')
  const listHeadingSorBy = document.createElement('div')
  const listHeadingCountry = document.createElement('div')
  const listHeadingCases = document.createElement('div')
  listHeading.appendChild(listHeadingSorBy)
  listHeading.appendChild(listHeadingCountry)
  listHeading.appendChild(listHeadingCases)
  listHeading.classList.add('list-container--heading')

  const listInputSearch = document.createElement('input')
  const listUl = document.createElement('ul') // use as a container for the list

  countries.map((item) => {
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

  });

  const listLi = document.createElement('li')
  const countryLogo = document.createElement('div')
  const listCountryName = document.createElement('span')
  const listCountryCase = document.createElement('span')

  listContainer.appendChild(listHeading)
  listContainer.appendChild(listInputSearch)
  listContainer.appendChild(listUl)

}