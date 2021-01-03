export default class Search {
  constructor() {
    Search.prototype.input = document.querySelector('.list-container--search');
    Search.prototype.itemsList = [...document.querySelector('.list-container > ul').children];

    Search.prototype.input.addEventListener('input', (e) => {
      e.preventDefault();
      Search.prototype.hideNotNeeded();
    });
  }

  hideNotNeeded() {
    const lengthOfCurrentQuery = Search.prototype.input.value.length;
    const currentQuery = Search.prototype.input.value;
    const { itemsList } = Search.prototype;
    itemsList.forEach((e) => {
      if (e.dataset.country.slice(0, lengthOfCurrentQuery).toLowerCase() != currentQuery.toLowerCase()) {
        e.style.display = 'none';
      } else {
        e.style.display = 'flex';
      }
    });
  }
}
