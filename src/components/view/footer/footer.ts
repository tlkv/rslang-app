import './footer.scss';
import Component from '../templates/component';

class Footer extends Component {
  protected elementContent = 'FOOTER';

  protected elementWrapper = `<div class="container">${this.elementContent}</div>`;

  constructor() {
    super('footer', ['footer-cl'], 'footer', document.body); // tag, class, id
    this.container.innerHTML = this.elementWrapper;
  }
}

export default Footer;
