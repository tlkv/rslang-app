import './main.scss';

export default function initMain(root: HTMLElement) {
  const elem = document.createElement('main');
  const someComputedValue = 'someComputedValue';
  elem.innerHTML = `<div class="container">MAIN + ${someComputedValue}</container>`;
  root.append(elem);
}
