'use strict';

import Field, { ItmeType } from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});

export class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  withMinionCount(num) {
    this.minionCount = num;
    return this;
  }

  withEvilCount(num) {
    this.evilCount = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration, //
      this.minionCount, //
      this.evilCount
    );
  }
}

class Game {
  constructor(gameDuration, minionCount, evilCount) {
    this.gameDuration = gameDuration;
    this.minionCount = minionCount;
    this.evilCount = evilCount;

    this.gameTimer = document.querySelector('.game__timer__left');
    this.gameScore = document.querySelector('.game__score__total');
    this.gameBtn = document.querySelector('.game__button');
    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
    });

    this.gameField = new Field(minionCount, evilCount);
    this.gameField.setClickListener(this.onItemClick);

    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimeAndScore();
    this.startGameTimer();
    sound.playBackground();
  }

  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(reason);
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === ItmeType.minion) {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.minionCount) {
        this.stop(Reason.win);
      }
    } else if (item === ItmeType.evil) {
      this.stop(Reason.lose);
    }
  };

  showStopButton() {
    const icon = this.gameBtn.querySelector('.fa-brands');
    icon.classList.add('fa-app-store-ios');
    icon.classList.remove('fa-google-play');
    this.gameBtn.style.visibility = 'visible';
  }

  hideGameButton() {
    this.gameBtn.style.visibility = 'hidden';
    this.gameTimer.style.visibility = 'hidden';
  }

  showTimeAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.stop(this.minionCount === this.score ? Reason.win : Reason.lose);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes} : ${seconds}`;
  }

  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.minionCount;
    this.gameField.init();
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.minionCount - this.score;
  }
}
