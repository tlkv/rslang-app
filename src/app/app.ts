import FrontController from './controllers/frontController/frontConroller';
import AuthorizationController from './controllers/authorizationController/authorizationConroller';
import TextbookController from './controllers/textbookController/textbookConroller';
import GameSprintController from './controllers/gameSprintController/gameSprintConroller';
import GameAudioController from './controllers/gameAudioController/gameAudioConroller';
import StatisticsController from './controllers/statisticsController/statisticsConroller';
import TestController from './controllers/testController/testConroller';

import IController from './models/api/interfaces/IController';
import defaultRoutes from './models/router/defaultRoutes';

class App {
  root: HTMLElement;

  currentController: IController;

  constructor(root: HTMLElement) {
    this.root = root;
    this.currentController = new FrontController(this.root);
  }

  start() {
    window.addEventListener('hashchange', this.router);
    window.addEventListener('load', this.router);
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
