import HeaderView from './header/header';
import Main from './main/main';
import FooterView from './footer/footer';
import Controller from '../../controller/controller';
import AbstractPageView from '../abstractViews/abstractMainView';
import MainPart from './main/main';

class MainView extends AbstractPageView {
  header: HeaderView;
  main: MainPart;
  footer: FooterView;

  constructor(controller: Controller) {
    super();
    this.header = new HeaderView();
    this.main = new MainPart();
    this.footer = new FooterView();
  }

  draw() {
    document.body.innerHTML = '';
    this.header.draw();
    this.main.draw();
    this.footer.draw();
  }
}

export default MainView;
