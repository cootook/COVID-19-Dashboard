import grafCovid from './graph.js';
import GetTable from './table.js';
import currentData from '../data/current-data-show.js';
import dataApiDiseaseSh from '../data/from-api-disease-sh.js';
import sayString from './speech-synthesis.js';

export default class Listener {
  constructor(data) {
    this.itemsList = document.querySelector('.list-container > ul');
    this.data = data;
    this.infoContainer = document.querySelector('.info-container');
    this.switcherAllToday = document.querySelector('.switcher--check-box__all-today');
    this.switcherAbsolutePer = document.querySelector('.switcher--check-box__abs-per');
    this.table = document.querySelector('.table--heading');
  }

  eventHandler() {
    this.itemsList.addEventListener('click', this.graphRender.bind(this.data));
    this.itemsList.addEventListener('click', this.refreshTable);
    this.infoContainer.addEventListener('click', this.getGlobal);
    this.switcherAllToday.addEventListener('click', () => {
      currentData.isAll = !currentData.isAll;
      GetTable.prototype.tableRefresh();
    });
    this.switcherAbsolutePer.addEventListener('click', () => {
      currentData.isAbs = !currentData.isAbs;
      GetTable.prototype.tableRefresh();
    });
    this.table.addEventListener('click', () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        return;
      }
      sayString(GetTable.prototype.strToSpeak);
    });
  }

  graphRender(e) {
    const grafContainer = document.querySelector('.graph-container__content');
    if (grafContainer) grafContainer.innerHTML = '';
    else return false;
    const canvas = document.createElement('canvas');
    canvas.id = 'myChart';
    document.querySelector('.graph-container__content').append(canvas);

    let country;
    if (e) {
      if (e.target.tagName === 'LI') {
        country = e.target.dataset.country;
      } else {
        country = e.target.parentNode.dataset.country;
      }
    } else {
      country = 'world';
    }
    grafCovid(dataApiDiseaseSh, country);
  }

  refreshTable(e) {
    if (e.target.tagName === 'LI') {
      currentData.country = e.target.dataset.country;
    } else {
      currentData.country = e.target.parentNode.dataset.country;
    }

    GetTable.prototype.tableRefresh();
  }

  getGlobal() {
    currentData.isAbs = true;
    currentData.isAll = true;
    currentData.country = 'world';
    GetTable.prototype.tableRefresh();
    Listener.prototype.graphRender();
  }
}
