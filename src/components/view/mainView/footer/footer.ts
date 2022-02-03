import './footer.scss';
import AbstractFooterView from '../../abstractViews/abstractFooterView';

// export default function initFooter(root: HTMLElement) {
//   const elem = document.createElement('footer');
//   const someComputedValue = 'someComputedValue';
//   elem.innerHTML = `<div class="container">FOOTER + ${someComputedValue}</container>`;
//   root.append(elem);
// }

class FooterView extends AbstractFooterView {
  constructor() {
    super();
  }
  draw() {
    const someComputedValue = 'someComputedValue';
    this.footerContainer.innerHTML = `<div class="container">FOOTER + ${someComputedValue}</container>`;
    document.body.appendChild(this.footerContainer);
  }
}

export default FooterView;
