import './header.scss';
import Component from '../templates/component';

class Header extends Component {
  protected elementContent = 'Header';

  protected elementWrapper = `<div class="container">${this.elementContent}</div>`;

  constructor() {
    super('header', ['header-cl'], 'header', document.body); // tag, class, id
    this.container.innerHTML = this.elementWrapper;
  }
}

export default Header;
