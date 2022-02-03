import './header.scss';
import AbstractHeaderView from '../../abstractViews/abstractHeaderView';

// export default function initHeader(root: HTMLElement) {
//   const elem = document.createElement('header');
//   const someComputedValue = 'someComputedValue';
//   elem.innerHTML = `<div class="container">HEADER + ${someComputedValue}</container>`;
//   root.append(elem);
// }

class HeaderView extends AbstractHeaderView {
  constructor() {
    super();
  }

  draw() {
    console.log('header draw');

    // this.headerContainer.innerHTML = '';
    this.headerContainer.innerHTML = `<nav>
    <a class="href-btn" id="main-btn" href="#main">Main</a>
    <a class="href-btn" id="dictionary-btn" href="#dictionary">Dictionary</a>
    <a class="href-btn" id="mini-games-btn" href="#mini-games">Mini games</a>
    <a class="href-btn" id="statistics-btn" href="#statistics">Statistics</a>
  </nav>
`;
    document.body.appendChild(this.headerContainer);
  }
}

export default HeaderView;
