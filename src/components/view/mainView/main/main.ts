import './main.scss';
import AbstractMainView from '../../abstractViews/abstractMainView';

// export default function initMain(root: HTMLElement) {
//   const elem = document.createElement('main');
//   const someComputedValue = 'someComputedValue';
//   elem.innerHTML = `<div class="container">MAIN + ${someComputedValue}</container>`;
//   root.append(elem);
// }

class MainPart extends AbstractMainView {
  constructor() {
    super();
  }
  draw() {
    this.mainContainer.innerHTML = '';
    this.mainContainer.innerHTML += `this is a main part of the main view`;
    document.body.appendChild(this.mainContainer);
  }
}

export default MainPart;
