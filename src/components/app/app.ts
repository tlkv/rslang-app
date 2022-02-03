import Header from '../view/header/header';
import Main from '../view/main/main';
import FrontPage from '../view/frontPage/frontPage';
import Textbook from '../view/textbook/textbook';
import Footer from '../view/footer/footer';

class App {
  root: HTMLElement;

  header: Header;

  main: Main;

  frontPage: FrontPage;

  textbook: Textbook;

  footer: Footer;

  constructor(root: HTMLElement) {
    this.root = root; // document root
    this.header = new Header();
    this.main = new Main(); // this is ROOT for routing
    this.footer = new Footer();

    // will be handled via router - append only one page like Textbook\FrontPage in main
    this.frontPage = new FrontPage(this.main.getContainer()); // appends frontPage to main
    this.textbook = new Textbook(this.main.getContainer());
  }
}

export default App;
