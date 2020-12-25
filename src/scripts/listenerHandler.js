
import grafCovid from './graph.js';
import GetTable from './table.js'


export default class Listener {
    constructor(data) {
        this.itemsList = document.querySelector('.list-container > ul');
        this.data = data;
    }


    eventHandler() {
        this.itemsList.addEventListener('click', this.graphRender.bind(this.data));
        this.itemsList.addEventListener('click', this.refreshTable);
    }

    graphRender(e) {
        const grafContainer = document.querySelector('.graph-container__content')
        if (grafContainer) grafContainer.innerHTML = '';
        else return false;
        let canvas = document.createElement('canvas');
        canvas.id = 'myChart';
        document.querySelector('.graph-container__content').append(canvas);

        let country;
        if (e.target.tagName === 'LI') {
            country = e.target.dataset.country;
        }
        else {
            country = e.target.parentNode.dataset.country;
        }
        grafCovid(this, country);
    }

    refreshTable(e) {
        GetTable.prototype.tableRefresh()
        console.log('ref ')
    }
}