import './footer.scss';
import Component from '../component';

class Footer extends Component {
  elemContent = `<footer>
      <div class="authors-box">
          <a href="https://github.com/tlkv/rslang"><i class="fab fa-github" aria-hidden="true"></i></a>
      </div>
    </footer>`;

  elemWrapper = new Component('div', ['container']);

  constructor(root: HTMLElement) {
    super('footer', ['footer'], root);
    this.elemWrapper.container.innerHTML = this.elemContent;
    this.container.append(this.elemWrapper.container);
  }
}

export default Footer;
