// import testTest from './scripts/script.test.js';
import getDataFromApiStat from './scripts/get-data-from-api-stat.js'
import dataApiDiseaseSh from './data/from-api-disease-sh.js';
import Graph from './scripts/chart.js';


// console.log('test 1');
// console.log(testTest())
getDataFromApiStat().then((r) => console.log('main --- ', dataApiDiseaseSh, 'res ++++ ', r))
// setTimeout(() => {
//   console.log('main --- ', dataApiDiseaseSh)
// }, 2000)


let x = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
let values = [10,9,8,7,6,5,4,3,2,1];
let graph = new Graph();
graph.initSize();
graph.createGraph(x, values, 'bar', 'daily cases');