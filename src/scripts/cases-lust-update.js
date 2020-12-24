import { info } from 'autoprefixer';
import dataApiDiseaseSh from '../data/from-api-disease-sh.js';

//<section class="info-container" id="info-container">
//    <h2>Global Cases</h2>
//    <span>123 456 789</span>
//</section>

export default class CasesLustUpdate {

  constructor() {
    const showTime = (x) => {
      const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      const daysArr = ["Sat", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      const dateObj = new Date(x);

      const year = dateObj.getFullYear();
      const month = dateObj.getMonth();
      const numDay = dateObj.getDate();
      const day = dateObj.getDay();
      const hour = dateObj.getHours();
      const minute = dateObj.getMinutes();
      const second = dateObj.getSeconds();

      if (minute < 10) minute = "0" + minute;

      if (second < 10) second = "0" + second;

      const out = `${daysArr[day]}, ${numDay} ${monthsArr[month]} ${year}, ${hour}:${minute}:${second}`
      daysArr[day] + ", " + numDay + " " + monthsArr[month] + " " + year + ", " + hour + ":" + minute + ":" + second;

      return out;
    }
    const statValue = dataApiDiseaseSh.world.casesLustUpdate
    const updateValue = dataApiDiseaseSh.world.updated

    // const infoContainer = document.querySelector('.info-container')
    const fragment = document.createComment
    const heading = document.createElement('h2')
    heading.classList.add('info-container--heading')
    const stat = document.createElement('div')
    stat.classList.add('info-container--stat')
    const update = document.createElement('div')
    update.classList.add('info-container--update')

    fragment.appendChild(heading)
    fragment.appendChild(stat)
    fragment.appendChild(update)

    heading.innerText = `Global Cases`
    stat.innerText = statValue
    update.innerText = `Last update ${showTime(updateValue)}`
    this.fragment = fragment
    return fragment;
  }

  appendStatUpdate() {
    const infoContainer = document.querySelector('.info-container')
    infoContainer.appendChild(this.fragment)
  }

  updateSection() {
    const infoContainer = document.querySelector('.info-container')

    document.querySelector('.info-container--heading').remove()
    document.querySelector('.info-container--stat').remove()
    document.querySelector('.info-container--update').remove()

    const newInfo = new CasesLustUpdate()
    infoContainer.appendChild(newInfo)
  }

}
