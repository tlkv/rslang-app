import './header.scss';
import Component from '../component';
import defaultRoutes from '../../../models/router/defaultRoutes';

class Header extends Component {
  elemContent = `<a href="#${defaultRoutes.frontpage.path}">${defaultRoutes.frontpage.name}</a>
  <a href="#${defaultRoutes.authorization.path}">${defaultRoutes.authorization.name}</a>
  <a href="#${defaultRoutes.textbook.path}">${defaultRoutes.textbook.name}</a>
  <a href="#${defaultRoutes.gameSprint.path}">${defaultRoutes.gameSprint.name}</a>
  <a href="#${defaultRoutes.gameAudio.path}">${defaultRoutes.gameAudio.name}</a>
  <a href="#${defaultRoutes.statistics.path}">${defaultRoutes.statistics.name}</a>
  <a href="#${defaultRoutes.testpage.path}">${defaultRoutes.testpage.name}</a>`;

  elemWrapper = new Component('div', ['container']);

  constructor(root: HTMLElement) {
    super('header', ['header'], root);
    this.elemWrapper.container.innerHTML = this.elemContent;
    this.container.append(this.elemWrapper.container);
  }
}

export default Header;
