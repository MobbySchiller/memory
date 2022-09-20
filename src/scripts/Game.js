import { menu } from './Menu.js';
import { Card } from './Card.js';
import countriesList from '../countries.json';

const WINDOW_WIDTH = 640;
const WINDOW_HEIGHT = 480;
const SCORE_BOARD_ID = 'js-score';
const SCALE_PROPERTY = '--scale';
const ALL_COUNTRIES = 100;
const CARD_CHECKING_TIME = 1400;

class Game {
    constructor() {
        this.levels = {
            easy: { rows: 4, cols: 4, pairs: 8 },
            medium: { rows: 6, cols: 6, pairs: 18 },
            hard: { rows: 8, cols: 8, pairs: 32 }
        };
        this.scoreBoard = document.getElementById(SCORE_BOARD_ID);
        this.usersScore = 0;
        this.drawedCountries = [];
        this.pickedCards = [];
        this.canPickCard = true;
    }

    init() {
        this.resizeWindow();
        window.addEventListener('resize', this.resizeWindow);
        menu.init();
    }

    resizeWindow() {
        const { innerWidth: width, innerHeight: height } = window;
        const scale = Math.min(width / WINDOW_WIDTH, height / WINDOW_HEIGHT);
        document.documentElement.style.setProperty(SCALE_PROPERTY, scale);
    }

    drawCountries(number) {
        const countriesId = [...this.drawCountriesId(number)];
        this.drawedCountries = countriesId.map(id => countriesList.countries[id]);
    }

    drawCountriesId(number) {
        const countriesId = new Set();
        while (countriesId.size !== number) {
            countriesId.add(Math.floor(Math.random() * ALL_COUNTRIES))
        }
        return countriesId;
    }

    pickCards(e) {
        if (this.canPickCard) {
            const choice = e.target.parentNode;
            if (this.pickedCards.length == 0 || this.pickedCards.length == 1 && this.pickedCards[0] != choice) {
                this.flipCard(choice.firstChild);
                this.flipCard(choice.lastChild);
                this.pickedCards.push(choice);
            }

            if (this.pickedCards.length == 2) {
                this.canPickCard = !this.canPickCard;
                setTimeout(() => this.checkResult(), CARD_CHECKING_TIME);
            }
        }
    }

    flipCard(card) {
        card.classList.add('rotate');
    }

    checkResult() {
        this.pickedCards[0].dataset.country == this.pickedCards[1].dataset.country ? this.correctMatch(this.pickedCards) : this.flipCardsBack(this.pickedCards);
        this.resetChoice();
        this.canPickCard = !this.canPickCard;
    }

    correctMatch(cards) {
        this.updateScore(++this.usersScore);
        this.removeCards(cards);
    }

    updateScore(score) {
        this.scoreBoard.textContent = score;
    }

    removeCards(cards) {
        cards.forEach(card => card.classList.add('card--invisible'));
    }

    flipCardsBack(cards) {
        cards.forEach(card => card.firstChild.classList.remove('rotate'));
        cards.forEach(card => card.lastChild.classList.remove('rotate'));
    }

    resetChoice() {
        this.pickedCards = [];
    }
}

export const game = new Game();
game.init();