import initHeader from '../view/header/header';
import initMain from '../view/main/main';
import initFooter from '../view/footer/footer';

class App {
  root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  start() {
    window.addEventListener('DOMContentLoaded', () => {
      initHeader(this.root);
      initMain(this.root);
      initFooter(this.root);
    });
  }
}

export default App;
