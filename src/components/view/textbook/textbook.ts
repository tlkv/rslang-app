import './textbook.scss';

import Component from '../templates/component';

class Textbook extends Component {
  protected elementContent = 'Textbook (will be hidden from main later via routing)';

  protected elementWrapper = `<div class="container">${this.elementContent}</div>`;

  constructor(root: HTMLElement) {
    super('div', ['textbook', 'routed-component'], 'textbook', root); // tag, class, id
    this.container.innerHTML = this.elementWrapper;
  }
}

export default Textbook;
