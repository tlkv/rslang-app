import './header.scss';

export default function initHeader(root: HTMLElement) {
  const elem = document.createElement('header');
  const someComputedValue = 'someComputedValue';
  elem.innerHTML = `<div class="container">HEADER + ${someComputedValue}</container>`;
  root.append(elem);
}
