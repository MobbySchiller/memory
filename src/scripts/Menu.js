import { game } from './Game.js';
import { board } from './Board.js';

const START_BUTTON_ID = 'js-start-button';
const LEVEL_BUTTONS_CLASS = '.menu__level-button';
const GAME_LAYER_FRONT_ID = 'js-game-layer-front';
const GAME_LAYER_BACK_ID = 'js-game-layer-back';

class Menu {
    constructor() {
        this.startButton = document.getElementById(START_BUTTON_ID);
        this.levelButtons = [...document.querySelectorAll(LEVEL_BUTTONS_CLASS)];
        this.gameLayerFront = document.getElementById(GAME_LAYER_FRONT_ID);
        this.gameLayerBack = document.getElementById(GAME_LAYER_BACK_ID);
    }

    init() {
        this.startButton.addEventListener('click', () => this.playGame(this.pickedLevel));
        this.levelButtons.forEach(button => button.addEventListener('click', (e) => this.pickLevel(e)));
    }

    playGame(level) {
        const levelProperties = game.levels[level];
        if (level) {
            this.startButton.disabled = true;
            this.rotateGameLayer();
            game.startGame(levelProperties.pairs);
            board.generateBoard(levelProperties, game.drawedCountries);
        }
    }

    rotateGameLayer() {
        this.gameLayerFront.classList.add('rotate');
        this.gameLayerBack.classList.add('rotate');
    }

    pickLevel(e) {
        const clickedButton = e.target;
        this.pickedLevel = clickedButton.dataset.level;
        this.resetMark();
        clickedButton.classList.add('menu__level-button--clicked');
    }

    resetMark() {
        this.levelButtons.forEach(button => button.classList.remove('menu__level-button--clicked'));
    }

    openMenu() {
        this.gameLayerFront.classList.remove('rotate');
        this.gameLayerBack.classList.remove('rotate');
        this.startButton.disabled = false;
        this.resetMark();
    }

}

export const menu = new Menu();