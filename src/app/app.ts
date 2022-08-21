import FrontController from './controllers/frontController/frontConroller';
import AuthorizationController from './controllers/authorizationController/authorizationConroller';
import TextbookController from './controllers/textbookController/textbookConroller';
import GameSprintController from './controllers/gameSprintController/gameSprintConroller';
import GameAudioController from './controllers/gameAudioController/gameAudioConroller';
import StatisticsController from './controllers/statisticsController/statisticsConroller';
import TestController from './controllers/testController/testConroller';

import IController from './models/api/interfaces/IController';
import defaultRoutes from './models/router/defaultRoutes';
import { state } from './models/api/state/state';

class App {
  root: HTMLElement;

  currentController: IController;

  constructor(root: HTMLElement) {
    this.root = root;
    this.currentController = new FrontController(this.root);
    this.handleLocalStorage();
  }

  start() {
    window.addEventListener('hashchange', () => {
      this.router();
    });
  }

  handleLocalStorage() {
    window.addEventListener('load', () => {
      state.isAuth = !!localStorage.getItem('userId');
      if (localStorage.getItem('loc-tb-group')) {
        state.textbookGroup = JSON.parse(localStorage.getItem('loc-tb-group') as string);
      }
      if (localStorage.getItem('loc-tb-page')) {
        state.textbookPage = JSON.parse(localStorage.getItem('loc-tb-page') as string);
      }
      if (localStorage.getItem('loc-tb-diff')) {
        state.textbookShowDifficult = JSON.parse(localStorage.getItem('loc-tb-diff') as string);
      }
      if (localStorage.getItem('loc-tb-learned')) {
        state.textbookShowLearned = JSON.parse(localStorage.getItem('loc-tb-learned') as string);
      }
      this.router();
    });

    window.addEventListener('beforeunload', () => {
      localStorage.setItem('loc-tb-group', JSON.stringify(state.textbookGroup));
      localStorage.setItem('loc-tb-page', JSON.stringify(state.textbookPage));
      localStorage.setItem('loc-tb-diff', JSON.stringify(state.textbookShowDifficult));
      localStorage.setItem('loc-tb-learned', JSON.stringify(state.textbookShowLearned));
    });
  }

  router() {
    const routes = [
      { path: defaultRoutes.authorization.path, Controller: AuthorizationController },
      { path: defaultRoutes.textbook.path, Controller: TextbookController },
      { path: defaultRoutes.gameSprint.path, Controller: GameSprintController },
      { path: defaultRoutes.gameAudio.path, Controller: GameAudioController },
      { path: defaultRoutes.statistics.path, Controller: StatisticsController },
      { path: defaultRoutes.testpage.path, Controller: TestController },
    ];
    const match = routes.find((route) => window.location.href.includes(route.path));
    this.root.innerHTML = '';
    if (match) {
      this.currentController = new match.Controller(this.root);
    } else {
      this.currentController = new FrontController(this.root);
    }
  }
}

export default App;
