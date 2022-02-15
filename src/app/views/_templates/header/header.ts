import './header.scss';
import Component from '../component';
import defaultRoutes from '../../../models/router/defaultRoutes';

class Header extends Component {
  elemContent = `<nav class="navigation"> 
        <div class="title">
          <a href="#frontpage">
            <img src="./assets/icon.png" alt="icon" class="icon" />
          </a>  
          <h1 class="h1"><a href="#${defaultRoutes.frontpage.path}" class="menu-item">RS-Lang</a></h1> 
        </div>
        <ul class="menu">    
        <a href="#${defaultRoutes.textbook.path}" class="menu-item">${defaultRoutes.textbook.name}</a>
        <div class="dropdown">
        <a href="#" class="menu-item">Games</a>
        <div class="dropdown-content">
        <a href="#${defaultRoutes.gameSprint.path}" class="dropdown-menu-item">${defaultRoutes.gameSprint.name}</a>
        <a href="#${defaultRoutes.gameAudio.path}" class="dropdown-menu-item">${defaultRoutes.gameAudio.name}</a>
        </div>
        </div>
        <a href="#${defaultRoutes.statistics.path}" class="menu-item">${defaultRoutes.statistics.name}</a>
        <a href="#${defaultRoutes.authorization.path}" class="log-in">Login<ion-icon name="person-circle-outline" size="large"></ion-icon
        ></a>
        <a href="#${defaultRoutes.authorization.path}" class="sign-out">sign out</a>
        </ul>
        </nav>`;

  elemWrapper = new Component('div', ['container']);

  constructor(root: HTMLElement) {
    super('header', ['header'], root);
    this.elemWrapper.container.innerHTML = this.elemContent;
    this.container.append(this.elemWrapper.container);
  }
}

export default Header;
