'use strict';

const gridSize = 16;
let drawMode = 'black';
let tainted = [];

const createSquare = size => {
  if (size > 100) size = 100;
  const createEl = className => {
    const element = document.createElement('div');
    element.classList.add(className);
    return element;
  }
  const createRow = rowSize => {
    const row = createEl('row');
    for (let i = 0; i < rowSize; i++) {
      row.appendChild(createEl('cell'));
    }
    return row;
  }
  const square = createEl('square');
  for (let i = 0; i < size; i++) {
    square.appendChild(createRow(size));
  }
  return square;
}

const mouseHandler = e => {
  if (tainted.includes(e.target) && drawMode != 'taint') return

  if (drawMode == 'taint') {
    let value = window.getComputedStyle(e.target)['background-color']
      .split(', ')[1] - 26;
    e.target.style['background-color'] = `rgb(${value}, ${value}, ${value})`;

    if (!tainted.includes(e.target))
      tainted.push(e.target);

    if (value < 0) {
      value = 0;
      e.target.removeEventListener('mouseenter', mouseHandler);
      tainted.splice(tainted.indexOf(e.target), 1);
    }

    return
  }

  if (drawMode == 'black') {
    e.target.style['background-color'] = 'black';
    e.target.removeEventListener('mouseenter', mouseHandler);
    return
  }

  if (drawMode == 'colorful') {
    const getRandomInt = max => Math.floor(Math.random() * max);
    e.target.style['background-color'] =
      `rgb(${getRandomInt(256)}, ${getRandomInt(256)}, ${getRandomInt(256)})`;

    e.target.removeEventListener('mouseenter', mouseHandler);
    return
  }
}

const init = size => {
  document.querySelector('main').appendChild(createSquare(size));

  Array.from(document.querySelectorAll('.cell')).forEach(cell => {
    cell.addEventListener('mouseenter', mouseHandler);
  })
}

document.querySelector('button').addEventListener('click', () => {
  document.querySelector('.square').remove();
  init(prompt('Please type grid size:', 16) || 100);
})

document.querySelector('select').addEventListener(
  'change', e => drawMode = e.target.value
)

init(gridSize);