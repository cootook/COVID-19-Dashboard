export default function Search() {
    let input = document.querySelector('.list-container--search');
    let itemsList = [...document.querySelector('.list-container > ul').children];

    input.addEventListener('keyup', function(e) {
        e.preventDefault();
        itemsList.forEach(e => {
            if (e.dataset.country.slice(0,this.value.length).toLowerCase() != this.value) {
                e.style.display = 'none';
            }
            else {
                e.style.display = 'flex';
            }
        });
    }); 

}