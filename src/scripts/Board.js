import { Card } from './Card.js';

const BOARD_ID = 'js-board';

class Board {
    constructor() {
        this.board = document.getElementById(BOARD_ID);
        this.cards = [];
    }

    generateBoard(level, countries) {
        this.board.style.gridTemplateRows = `repeat(${level.rows}, 1fr)`;
        this.board.style.gridTemplateColumns = `repeat(${level.cols}, 1fr)`;
        this.generateCards(countries);
        this.shuffleCards(this.cards);
        this.pushCardsToBoard(this.cards, this.board);
    }

    generateCards(countries) {
        countries.forEach(country => {
            const card1 = new Card(country);
            const card2 = new Card(country);
            this.cards.push(card1);
            this.cards.push(card2);
        })
    }

    shuffleCards(cards) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        };
    }

    pushCardsToBoard(cards, board) {
        cards.forEach(card => board.appendChild(card.nodeElement));
    }
}

export const board = new Board();