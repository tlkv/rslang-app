import Api from '../api/api';
import AppView from '../view/appView';

class Controller {
  api: Api;
  view: AppView;

  constructor() {
    this.api = new Api();
    this.view = new AppView(this);
    this.start();
  }

  start() {
    this.view.drawMainView();
    location.hash = 'main';
    window.addEventListener('hashchange', () => {
      this.refreshPage();
    });
  }

  refreshPage() {
    const base = location.hash;
    switch (base.slice(1)) {
      case 'main':
        this.view.currentView = this.view.mainView;
        break;
      case 'dictionary':
        this.view.currentView = this.view.dictionaryView;
        break;
      case 'mini-games':
        // this.view.currentView = this.view.minigamesView;
        break;
      case 'statistics':
        // this.view.currentView = this.view.statisticsView;
        break;
    }
    this.view.currentView.draw();
  }
}

export default Controller;
