import './footer.scss';
import Component from '../component';
import '../../../../assets/github.png';

class Footer extends Component {
  elemContent = `<footer>
      <p class="year-of-creation">@2022</p>
      <div class="authors-box">
          <img src="./assets/github.png" alt="github" class="github-img">
          <a href="https://github.com/kristykov" class="author">Kristina</a>
          <a href="https://github.com/AnastasiyaPoleshuk" class="author">Anastasiya</a>
          <a href="https://github.com/tlkv" class="author">Andrey</a>
      </div>
      <a href="https://rs.school/js/">
        <img src="https://rs.school/images/rs_school_js.svg" alt="rs.school" class="rs-school">
      </a>
    </footer>`;

  elemWrapper = new Component('div', ['container']);

  constructor(root: HTMLElement) {
    super('footer', ['footer'], root);
    this.elemWrapper.container.innerHTML = this.elemContent;
    this.container.append(this.elemWrapper.container);
  }
}

export default Footer;
