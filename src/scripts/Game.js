import { menu } from './Menu.js';
import { board } from './Board.js';
import { timer } from './Timer.js';
import { modal } from './Modal.js';

import countriesList from '../countries.json';
import cardSound from '../../public/audio/card-flip-sound.mp3';
import matchSound from '../../public/audio/match.mp3'

const WINDOW_WIDTH = 640;
const WINDOW_HEIGHT = 480;
const SCORE_BOARD_ID = 'js-score';
const MOVES_BOARD_ID = 'js-moves';
const SCALE_PROPERTY = '--scale';
const ALL_COUNTRIES = 100;
const CARD_CHECKING_TIME = 1200;

class Game {
    constructor() {
        this.levels = {
            easy: { rows: 4, cols: 4, pairs: 8 },
            medium: { rows: 6, cols: 6, pairs: 18 },
            hard: { rows: 8, cols: 8, pairs: 32 }
        };
        this.scoreBoard = document.getElementById(SCORE_BOARD_ID);
        this.movesBoard = document.getElementById(MOVES_BOARD_ID);
        this.usersScore = 0;
        this.drawedCountries = [];
        this.pickedCards = [];
        this.moves = 0;
        this.canPickCard = true;
        this.cardSound = new Audio(cardSound);
        this.matchSound = new Audio(matchSound);
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

    startGame(numberOfPairs) {
        this.resetProperties();
        this.updateScore(this.usersScore);
        this.showMoves(this.moves);
        this.drawCountries(numberOfPairs);
        timer.run();
    }

    resetProperties() {
        this.usersScore = 0;
        this.drawedCountries.length = 0;
        this.pickedCards = [];
        this.moves = 0;
        this.canPickCard = true;
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
                this.playSound(this.cardSound);
                this.pickedCards.push(choice);
            }

            if (this.pickedCards.length == 2) {
                this.canPickCard = !this.canPickCard;
                this.showMoves(++this.moves);
                setTimeout(() => this.checkResult(), CARD_CHECKING_TIME);
            }
        }
    }

    flipCard(card) {
        card.classList.add('rotate');
    }

    playSound(sound) {
        sound.play();
    }

    showMoves(moves) {
        this.movesBoard.textContent = moves;
    }

    checkResult() {
        this.pickedCards[0].dataset.country == this.pickedCards[1].dataset.country ? this.correctMatch(this.pickedCards) : this.flipCardsBack(this.pickedCards);
        this.resetChoice();
        this.canPickCard = !this.canPickCard;
    }

    correctMatch(cards) {
        this.updateScore(++this.usersScore);
        this.removeCards(cards);
        this.checkFinalResult();
        setTimeout(this.playSound(this.matchSound), 300);
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

    checkFinalResult() {
        if (this.usersScore === this.drawedCountries.length) {
            clearInterval(timer.interval);
            setTimeout(() => modal.displayModal(), 1000);
        }
    }

    playAgain() {
        modal.removeModal();
        timer.resetTimer();
        this.startGame(this.levels[menu.pickedLevel].pairs);
        board.generateBoard(this.levels[menu.pickedLevel], this.drawedCountries);
    }

}

export const game = new Game();
game.init();