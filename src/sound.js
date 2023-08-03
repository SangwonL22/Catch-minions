'use strict';

const minionSound = new Audio('./sound/minion_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const evilSound = new Audio('./sound/evil_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

export function playMinion() {
  playSound(minionSound);
}

export function playEvil() {
  playSound(evilSound);
}

export function playAlert() {
  playSound(alertSound);
}

export function playWin() {
  playSound(winSound);
}

export function playBackground() {
  playSound(bgSound);
}

export function stopBackground() {
  stopSound(bgSound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
