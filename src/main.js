'use strict';
import PopUp from './pop-up.js';
import * as sound from './sound.js';
import { GameBuilder, Reason } from './game.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .withGameDuration(5)
  .withMinionCount(3)
  .withEvilCount(3)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = 'Try Again💡';
      sound.playAlert();
      break;
    case Reason.win:
      message = 'Yay! Clear✨';
      sound.playWin();
      break;
    case Reason.lose:
      message = 'LOST🍌';
      sound.playEvil();
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
