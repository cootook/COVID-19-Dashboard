// import testTest from './scripts/script.test.js';
import getDataFromApiStat from './scripts/get-data-from-api-stat.js'
import dataApiDiseaseSh from './data/from-api-disease-sh.js';


// console.log('test 1');
// console.log(testTest())
getDataFromApiStat().then((r) => console.log('main --- ', dataApiDiseaseSh, 'res ++++ ', r))
// setTimeout(() => {
//   console.log('main --- ', dataApiDiseaseSh)
// }, 2000)