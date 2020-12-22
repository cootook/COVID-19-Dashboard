import dataApiDiseaseSh from '../data/from-api-disease-sh.js';


async function getDataFromApiStat() {
  const startGlobalTime = new Date();
  const arrOfSrc = [
    [
      'countries', 'https://corona.lmao.ninja/v2/countries'
    ],
    [
      'world', 'https://disease.sh/v3/covid-19/all?yesterday=false&twoDaysAgo=false&allowNull=true'
    ],
    [
      'countriesHistory', 'https://disease.sh/v3/covid-19/historical?lastdays=all'
    ],
    [
      'worldHistory', 'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
    ]
  ]
  class DataGetter {
    constructor(whichData, url) {
      async function getIt() {
        try {
          let response = await fetch(url);
          let data = await response.json();
          dataApiDiseaseSh[whichData] = data;
          return data;
        }
        catch (err) {
          console.error(`problems with API on ${whichData} `, err);
        }
      }

      return getIt();

    }

  }

  async function getAll() {
    const res = arrOfSrc.map(el => new DataGetter(el[0], el[1]))
    return Promise.all(res);
  }
  const res = await getAll().then((r) => {
    const endGlobalTime = new Date();
    const takeGlobalTime = endGlobalTime - startGlobalTime;
    console.log(`got data from API in ${takeGlobalTime}ms`);
    return r;
  });

  return res;

}

export default getDataFromApiStat
