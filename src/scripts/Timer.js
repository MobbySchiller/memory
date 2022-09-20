const SECONDS_ID = 'js-seconds';
const MINUTES_ID = 'js-minutes';

class Timer {
    constructor() {
        this.minutesDisplay = document.getElementById(MINUTES_ID);
        this.secondsDisplay = document.getElementById(SECONDS_ID);
        this.minutes = 0;
        this.seconds = 0;
        this.interval = null;
    }

    run() {
        this.interval = setInterval(() => this.changeTime(), 1000)
    }

    changeTime() {
        this.seconds++;
        if (this.seconds % 60 == 0) {
            this.minutes++;
            this.seconds = 0;
            this.displayMinutes(this.minutes, this.minutesDisplay);
        }
        this.displaySeconds(this.seconds, this.secondsDisplay);
    }

    displayMinutes(minutes, display) {
        if (minutes < 10) {
            display.textContent = `0${minutes}`;
        } else {
            display.textContent = minutes;
        }
    }

    displaySeconds(seconds, display) {
        if (seconds < 10) {
            display.textContent = `0${seconds}`;
        } else {
            display.textContent = seconds;
        }
    }

}

export const timer = new Timer();