import { game } from './Game.js';
import { menu } from './Menu.js';
import { timer } from './Timer.js';

const MODAL_ID = 'js-modal';
const SHADOW_ID = 'js-shadow';
const MODAL_RESULT_INFO_ID = 'js-result-info';
const PLAY_AGAIN_BUTTON_ID = 'js-play-again-button';
const MENU_BUTTON_ID = 'js-menu-button';

class Modal {
    constructor() {
        this.modal = document.getElementById(MODAL_ID);
        this.shadow = document.getElementById(SHADOW_ID);
        this.resultInfo = document.getElementById(MODAL_RESULT_INFO_ID);
        this.playAgainButton = document.getElementById(PLAY_AGAIN_BUTTON_ID);
        this.menuButton = document.getElementById(MENU_BUTTON_ID);
    }

    displayModal() {
        this.modal.classList.add('modal--active');
        this.shadow.classList.add('shadow--active');
        this.showGameResult();
        this.playAgainButton.addEventListener('click', () => game.playAgain());
        this.menuButton.addEventListener('click', () => this.goToMenu());
    }

    showGameResult() {
        if (!timer.minutes) {
            this.resultInfo.textContent = `${game.moves} moves in ${timer.seconds} seconds`;
        } else if (timer.minutes == 1) {
            this.resultInfo.textContent = `${game.moves} moves in ${timer.minutes} minute and ${timer.seconds} seconds`;
        } else {
            this.resultInfo.textContent = `${game.moves} moves in ${timer.minutes} minutes and ${timer.seconds} seconds`;
        }
    }

    goToMenu() {
        this.removeModal();
        menu.openMenu();
    }

    removeModal() {
        this.modal.classList.remove('modal--active');
        this.shadow.classList.remove('shadow--active');
    }
}

export const modal = new Modal();