import './header.scss';
import './burgerMenu.scss';
import Component from '../component';
import defaultRoutes from '../../../models/router/defaultRoutes';

class Header extends Component {
  static linkClicked(e: Event) {
    const target = e.target as HTMLAnchorElement;
    if (target.hash === window.location.hash) {
      window.location.reload();
    }
  }

  elemContent = `<nav class="navigation"> 
        <div class="title rsl-logo">
          <a href="#frontpage">
            <img src="./assets/icon.png" alt="icon" class="icon" />
          </a> 
        </div>       
        <a href="#${defaultRoutes.textbook.path}" class="menu-item">${defaultRoutes.textbook.name}</a>
        <a href="#${defaultRoutes.gameSprint.path}"  class="menu-item">${defaultRoutes.gameSprint.name}</a>
        <a href="#${defaultRoutes.gameAudio.path}" class="menu-item">${defaultRoutes.gameAudio.name}</a>
        <a href="#${defaultRoutes.statistics.path}" class="menu-item">${defaultRoutes.statistics.name}</a>
        <a href="#${defaultRoutes.authorization.path}" class="log-in"><i class="fa-solid fa-user"></i> Account</a>
      </nav>
      <div class="burger-menu">
        <a href="#" class="burger-menu-button">
          <span class="burger-menu-lines"></span>
        </a>
        <nav class="burger-menu-nav">
          <a href="#${defaultRoutes.frontpage.path}" class="burger-menu-link">${defaultRoutes.frontpage.name}</a>
          <a href="#${defaultRoutes.textbook.path}" class="burger-menu-link">${defaultRoutes.textbook.name}</a>
          <a href="#${defaultRoutes.gameSprint.path}" class="burger-menu-link">${defaultRoutes.gameSprint.name}</a>
          <a href="#${defaultRoutes.gameAudio.path}" class="burger-menu-link">${defaultRoutes.gameAudio.name}</a>
          <a href="#${defaultRoutes.statistics.path}" class="burger-menu-link">${defaultRoutes.statistics.name}</a>
          <a href="#${defaultRoutes.authorization.path}" class="burger-menu-link"><i class="fa-solid fa-user"></i> Account</a>
        </nav>
        <div class="burger-menu-overlay"></div>
      </div> `;

  elemWrapper = new Component('div', ['container']);

  constructor(root: HTMLElement) {
    super('header', ['header'], root);
    this.elemWrapper.container.innerHTML = this.elemContent;
    this.elemWrapper.container.querySelectorAll('.menu-item').forEach((a) => {
      a.addEventListener('click', Header.linkClicked);
    });
    this.container.append(this.elemWrapper.container);
    Header.drawBurgerMenu();
  }

  static drawBurgerMenu() {
    const menu = document.querySelector('.burger-menu') as HTMLDivElement;
    const button = document.querySelector('.burger-menu-button') as HTMLElement;
    const links = document.querySelector('.burger-menu-link') as HTMLElement;
    const overlay = document.querySelector('.burger-menu-overlay') as HTMLDivElement;

    button.addEventListener('click', (e) => {
      e.preventDefault();
      Header.toggleMenu(menu as HTMLDivElement);
    });

    links.addEventListener('click', () => Header.toggleMenu(menu as HTMLDivElement));
    overlay.addEventListener('click', () => Header.toggleMenu(menu as HTMLDivElement));
  }

  static toggleMenu(menu: HTMLDivElement) {
    menu.classList.toggle('burger-menu-active');
  }
}

export default Header;
