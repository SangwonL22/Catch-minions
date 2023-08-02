'use strict';

const MINION_SIZE = 130;
const MINION_COUNT = 10;
const EVIL_COUNT = 10;
const GAME_DURATION_SEC = 10;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer__left');
const gameScore = document.querySelector('.game__score__total');

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const minionSound = new Audio('./sound/minion_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const evilSound = new Audio('./sound/evil_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFieldClick);

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

popUpRefresh.addEventListener('click', () => {
  startGame();
  hidePopUp();
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimeAndScore();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopUpWithText('Try Again💡');
  playSound(alertSound);
  stopSound(bgSound);
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    playSound(winSound);
  } else {
    playSound(evilSound);
  }
  stopGameTimer();
  stopSound(bgSound);
  showPopUpWithText(win ? 'Yay! Clear✨' : 'LOST🍌');
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fa-brands');
  icon.classList.add('fa-app-store-ios');
  icon.classList.remove('fa-google-play');
  gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
  gameTimer.style.visibility = 'hidden';
}

function showTimeAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(MINION_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes} : ${seconds}`;
}

function showPopUpWithText(text) {
  popUpText.innerText = text;
  popUp.classList.remove('pop-up--hide');
}

function hidePopUp() {
  popUp.classList.add('pop-up--hide');
}

function initGame() {
  score = 0;
  field.innerHTML = '';
  gameScore.innerText = MINION_COUNT;
  addItem('minion', MINION_COUNT, 'imgs/minion.png');
  addItem('evil', EVIL_COUNT, 'imgs/evil.png');
}

function onFieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches('.minion')) {
    target.remove();
    score++;
    playSound(minionSound);
    updateScoreBoard();
    if (score === MINION_COUNT) {
      finishGame(true);
    }
  } else if (target.matches('.evil')) {
    finishGame(false);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.innerText = MINION_COUNT - score;
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - MINION_SIZE;
  const y2 = fieldRect.height - MINION_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
