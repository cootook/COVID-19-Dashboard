// store data from api
const dataApiDiseaseSh = {
  countries: null, // arr of unnamed obj
  // https://corona.lmao.ninja/v2/countries
  // {
  //   "updated":1608491985449,
  //   "country":"Afghanistan",
  //   "countryInfo":
  //     {
  //       "_id":4,
  //       "iso2":"AF",
  //       "iso3":"AFG",
  //       "lat":33,
  //       "long":65,
  //       "flag":"https://disease.sh/assets/img/flags/af.png"
  //     },
  //   "cases":50677,
  //   "todayCases":141,
  //   "deaths":2110,
  //   "todayDeaths":56,
  //   "recovered":39158,
  //   "todayRecovered":359,
  //   "active":9409,
  //   "critical":93,
  //   "casesPerOneMillion":1288,
  //   "deathsPerOneMillion":54,
  //   "tests":180385,
  //   "testsPerOneMillion":4586,
  //   "population":39333612,
  //   "continent":"Asia",
  //   "oneCasePerPeople":776,
  //   "oneDeathPerPeople":18642,
  //   "oneTestPerPeople":218,
  //   "activePerOneMillion":239.21,
  //   "recoveredPerOneMillion":995.54,
  //   "criticalPerOneMillion":2.36
  // }
  world: null, // object as bellow
  // https://disease.sh/v3/covid-19/all?yesterday=false&twoDaysAgo=false&allowNull=true
  // {
  //   "updated": 1608494473388,
  //   "cases": 77004488,
  //   "todayCases": 398667,
  //   "deaths": 1697450,
  //   "todayDeaths": 6295,
  //   "recovered": 53989894,
  //   "todayRecovered": 251448,
  //   "active": 21317144,
  //   "critical": 106203,
  //   "casesPerOneMillion": 9879,
  //   "deathsPerOneMillion": 217.8,
  //   "tests": 1149229098,
  //   "testsPerOneMillion": 147436.98,
  //   "population": 7794714054,
  //   "oneCasePerPeople": null,
  //   "oneDeathPerPeople": null,
  //   "oneTestPerPeople": null,
  //   "activePerOneMillion": 2734.82,
  //   "recoveredPerOneMillion": 6926.48,
  //   "criticalPerOneMillion": 13.63,
  //   "affectedCountries": 220
  // }
  countriesHistory: null,
  // https://disease.sh/v3/covid-19/historical?lastdays=3 Number of days to return. Use 'all' for the full data set (e.g. 15, all, 24)
  // {
  //   "country": "Afghanistan",
  //   "province": null,
  //   "timeline": {
  //     "cases": {
  //       "12/17/20": 49378,
  //       "12/18/20": 49621,
  //       "12/19/20": 49681
  //     },
  //     "deaths": {
  //       "12/17/20": 2025,
  //       "12/18/20": 2030,
  //       "12/19/20": 2047
  //     },
  //     "recovered": {
  //       "12/17/20": 38505,
  //       "12/18/20": 38540,
  //       "12/19/20": 38613
  //     }
  //   }
  // },
  worldHistory: null,
  // https://disease.sh/v3/covid-19/historical/all?lastdays=all
  // {
  //   "cases": {
  //     "date": 0
  //   },
  //   "deaths": {
  //     "date": 0
  //   },
  //   "recovered": {
  //     "date": 0
  //   }
  // }
};

export default dataApiDiseaseSh;
