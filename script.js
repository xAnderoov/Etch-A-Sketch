'use strict';

const createEl = className => {
  const element = document.createElement('div');
  element.classList.add(className);
  return element;
}

const createRow = size => {
  const row = createEl('row');
  for (let i = 0; i < size; i++) {
    row.appendChild(createEl('cell'));
  }
  return row;
}

const createSquare = size => {
  if (size > 100) size = 100;
  const square = createEl('square');
  for (let i = 0; i < size; i++) {
    square.appendChild(createRow(size));
  }
  return square;
}

document.querySelector('main').appendChild(createSquare(16));