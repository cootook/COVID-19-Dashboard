
import grafCovid from './graph.js';

export default class Listener {
    constructor(data) {
        this.itemsList = document.querySelector('.list-container > ul');
        this.data = data;
    }


    eventHandler() {
            this.itemsList.addEventListener('click', this.graphRender.bind(this.data));
    }

    graphRender(e) {
        let country;
        if (e.target.tagName === 'LI') {
            country = e.target.dataset.country;
        }
        else {
            country = e.target.parentNode.dataset.country;
        }

        grafCovid(this, country);
    }


}