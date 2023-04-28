'use strict';

const gridSize = 16;
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
const mouseHandler = e => {
  e.target.style['background-color'] = 'black';
  e.target.removeEventListener('mouseenter', mouseHandler);
}
const init = size => {
  document.querySelector('main').appendChild(createSquare(size));

  Array.from(document.querySelectorAll('.cell')).forEach(cell => {
    cell.addEventListener('mouseenter', mouseHandler);
  })
}
document.querySelector('.button--size').addEventListener('click', () => {
  document.querySelector('.square').remove();
  init(prompt('Please type grid size:', 16));
})
init(gridSize);