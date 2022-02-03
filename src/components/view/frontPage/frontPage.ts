import './frontPage.scss';

import Component from '../templates/component';

class FrontPage extends Component {
  protected elementContent = 'FrontPage (features, info, about us etc)';

  protected elementWrapper = `<div class="container">${this.elementContent}</div>`;

  constructor(root: HTMLElement) {
    super('div', ['front-page', 'routed-component'], 'front-page', root); // tag, class, id
    this.container.innerHTML = this.elementWrapper;
  }
}

export default FrontPage;
