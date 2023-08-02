'use strict';

const MINION_SIZE = 130;
const MINION_COUNT = 6;
const EVIL_COUNT = 3;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer__left');
const gameScore = document.querySelector('.game__score__total');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

function startGame() {
  initGame();
  showStopButton();
  showTimeAndScore();
}

function stopGame() {}

function showStopButton() {
  const icon = gameBtn.querySelector('.fa-google-play');
  icon.classList.add('fa-app-store-ios');
  icon.classList.remove('fa-google-play');
}

function showTimeAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function initGame() {
  field.innerHTML = '';
  gameScore.innerText = MINION_COUNT;
  addItem('minion', MINION_COUNT, 'imgs/minion.png');
  addItem('evil', EVIL_COUNT, 'imgs/evil.png');
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
