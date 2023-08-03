'use strict';
import * as sound from './sound.js';

const MINION_SIZE = 130;

export const ItmeType = Object.freeze({
  minion: 'minion',
  evil: 'evil',
});

export default class Field {
  constructor(minionCount, evilCount) {
    this.minionCount = minionCount;
    this.evilCount = evilCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
  }

  init() {
    this.field.innerHTML = '';
    this._addItem('minion', this.minionCount, 'imgs/minion.png');
    this._addItem('evil', this.evilCount, 'imgs/evil.png');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - MINION_SIZE;
    const y2 = this.fieldRect.height - MINION_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches('.minion')) {
      target.remove();
      sound.playMinion();
      this.onItemClick && this.onItemClick(ItmeType.minion);
    } else if (target.matches('.evil')) {
      this.onItemClick && this.onItemClick(ItmeType.evil);
    }
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
