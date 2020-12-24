import dataApiDiseaseSh from '../data/from-api-disease-sh.js';

//<section class="info-container" id="info-container">
//    <h2>Global Cases</h2>
//    <span>123 456 789</span>
//</section>

export default function casesLustUpdate() {
  const statValue = dataApiDiseaseSh.world.casesLustUpdate
  const updateValue = dataApiDiseaseSh.world.updated

  const infoContainer = document.querySelector('.info-container')
  const heading = document.createElement('h2')
  heading.classList.add('info-container--heading')
  const stat = document.createElement('div')
  stat.classList.add('info-container--stat')
  const update = document.createElement('div')
  update.classList.add('info-container--update')

  infoContainer.appendChild(heading)
  infoContainer.appendChild(stat)
  infoContainer.appendChild(update)

}
