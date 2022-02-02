import './footer.scss';

export default function initFooter(root: HTMLElement) {
  const elem = document.createElement('footer');
  const someComputedValue = 'someComputedValue';
  elem.innerHTML = `<div class="container">FOOTER + ${someComputedValue}</container>`;
  root.append(elem);
}
