import { game } from './Game.js';

const FLAG_API = 'https://countryflagsapi.com/svg/'

export class Card {
    constructor(name) {
        this.name = name;
        this.nodeElement = null;
        this.createCard(this.name);
    }

    createCard(countryName) {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-country', countryName);
        card.addEventListener('click', (e) => game.pickCards(e));

        const front = document.createElement('div');
        front.className = 'card__side card__side--front';

        const flag = document.createElement('div');
        flag.className = 'card__flag';
        flag.style.backgroundImage = `url('${FLAG_API}${countryName}')`;
        const name = document.createElement('div');
        name.className = 'card__name';
        name.textContent = this.capitalizeFirstLetter(countryName);

        const back = document.createElement('div');
        back.className = 'card__side card__side--back';


        front.appendChild(flag);
        front.appendChild(name);
        card.appendChild(front);
        card.appendChild(back);
        // card.addEventListener('click', (e) => game.pickCards(e));
        this.nodeElement = card;
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}