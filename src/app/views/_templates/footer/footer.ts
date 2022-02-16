import './footer.scss';
import Component from '../component';

class Footer extends Component {
  elemContent = `
  <img class="footer-wave-img" src="../../../../../assets/wave-footer.svg">
  <footer>
      <p class="footer-title">Connect With Us</p>
      <div class="authors-box">
      <a href="https://rs.school/js/">
      <img src="https://rs.school/images/rs_school_js.svg" alt="rs.school" class="rs-school">
    </a>
          <img src="./assets/github.png" alt="github" class="github-img">
          <a href="https://github.com/kristykov" class="author">Kristina</a>
          <a href="https://github.com/AnastasiyaPoleshuk" class="author">Anastasiya</a>
          <a href="https://github.com/tlkv" class="author">Andrey</a>
      
\
      </div>
      <p class="year-of-creation">&copy;2022 RS Lang Limited. Registered in Belarus under Company Registration 56789</p>
    </footer>`;

  elemWrapper = new Component('div', ['container']);

  constructor(root: HTMLElement) {
    super('footer', ['footer'], root);
    this.elemWrapper.container.innerHTML = this.elemContent;
    this.container.append(this.elemWrapper.container);
  }
}

export default Footer;
