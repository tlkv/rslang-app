import './footer.scss';
import Component from '../component';

class Footer extends Component {
  elemContent = `footer 
  content`;

  elemWrapper = new Component('div', ['container']);

  constructor(root: HTMLElement) {
    super('footer', ['footer'], root);
    this.elemWrapper.container.innerHTML = this.elemContent;
    this.container.append(this.elemWrapper.container);
  }
}

export default Footer;
