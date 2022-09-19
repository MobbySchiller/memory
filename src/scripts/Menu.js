const WINDOW_WIDTH = 640;
const WINDOW_HEIGHT = 480;
const SCALE_PROPERTY = '--scale';
const START_BUTTON_ID = 'js-start-button';
export const GAME_LAYER_FRONT_ID = 'js-game-layer-front';
export const GAME_LAYER_BACK_ID = 'js-game-layer-back';


class Menu {
    constructor() {
        this.startButton = document.getElementById(START_BUTTON_ID);
        this.gameLayerFront = document.getElementById('js-game-layer-front');
        this.gameLayerBack = document.getElementById('js-game-layer-back');
        this.resizeWindow();
        window.addEventListener('resize', this.resizeWindow);
        this.startButton.addEventListener('click', () => this.rotateGameLayer());
    }

    resizeWindow() {
        const { innerWidth: width, innerHeight: height } = window;
        const scale = Math.min(width / WINDOW_WIDTH, height / WINDOW_HEIGHT);

        document.documentElement.style.setProperty(SCALE_PROPERTY, scale);
    }

    rotateGameLayer() {
        this.gameLayerFront.classList.add('rotate');
        this.gameLayerBack.classList.add('rotate');
    }
}

const menu = new Menu();