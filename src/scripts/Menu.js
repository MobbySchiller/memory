import { board } from './Board.js';
import { game } from './Game.js';
import { timer } from './Timer.js';

const START_BUTTON_ID = 'js-start-button';
const LEVEL_BUTTONS_CLASS = '.menu__level-button';
const GAME_LAYER_FRONT_ID = 'js-game-layer-front';
const GAME_LAYER_BACK_ID = 'js-game-layer-back';

class Menu {
    constructor() {
        this.startButton = document.getElementById(START_BUTTON_ID);
        this.levelButtons = [...document.querySelectorAll(LEVEL_BUTTONS_CLASS)];
        this.gameLayerFront = document.getElementById('js-game-layer-front');
        this.gameLayerBack = document.getElementById('js-game-layer-back');
    }

    init() {
        this.startButton.addEventListener('click', () => this.startGame(this.pickedLevel));
        this.levelButtons.forEach(button => button.addEventListener('click', (e) => this.pickLevel(e)));
    }

    startGame(level) {
        const levelProperties = game.levels[level];
        console.log
        if (level) {
            this.rotateGameLayer();
            game.drawCountries(levelProperties.pairs);
            board.generateBoard(levelProperties, game.drawedCountries);
        }
        timer.run();
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

}

export const menu = new Menu();