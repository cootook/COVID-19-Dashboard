import dataApiDiseaseSh from '../data/from-api-disease-sh.js';

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
      let minute = dateObj.getMinutes();
      let second = dateObj.getSeconds();

      if (minute < 10) minute = "0" + minute;

      if (second < 10) second = "0" + second;

      const out = `${daysArr[day]}, ${numDay} ${monthsArr[month]} ${year}, ${hour}:${minute}:${second}`
      daysArr[day] + ", " + numDay + " " + monthsArr[month] + " " + year + ", " + hour + ":" + minute + ":" + second;

      return out;
    }
    const statValue = dataApiDiseaseSh.world.cases
    const updateValue = dataApiDiseaseSh.world.updated

    this.heading = document.createElement('h2')
    this.heading.classList.add('info-container--heading')
    this.stat = document.createElement('div')
    this.stat.classList.add('info-container--stat')
    this.update = document.createElement('div')
    this.update.classList.add('info-container--update')

    this.heading.innerText = `Global Cases`
    this.stat.innerText = statValue
    this.update.innerText = `Last update ${showTime(updateValue)}`
  }

  appendStatUpdate() {
    const infoContainer = document.querySelector('.info-container')
    infoContainer.appendChild(this.heading)
    infoContainer.appendChild(this.stat)
    infoContainer.appendChild(this.update)
  }

  updateSection() {
    document.querySelector('.info-container--heading').remove()
    document.querySelector('.info-container--stat').remove()
    document.querySelector('.info-container--update').remove()
    const newInfo = new CasesLustUpdate()
    newInfo.appendStatUpdate()
  }

}
