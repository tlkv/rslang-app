import Controller from '../controller/controller';
import MainView from '../view/mainView/mainView';
import DictionaryView from '../view/dictionaryView/dictionaryView';
import AbstractPageView from './abstractViews/abstractMainView';

class AppView {
  mainView: MainView;
  dictionaryView: DictionaryView;
  // minigamesView: MiniGamesView;
  // statisticsView: StatisticsView;
  currentView: AbstractPageView;
  controller: Controller;

  constructor(controller: Controller) {
    this.controller = controller;
    this.mainView = new MainView(this.controller);
    this.currentView = this.mainView;
    this.dictionaryView = new DictionaryView(this.controller);
    // this.minigamesView = new MiniGamesView();
    // this.statisticsView = new StatisticsView();
  }

  drawMainView() {
    this.currentView = this.mainView;
    this.mainView.draw();
  }

  drawDictionaryView() {
    this.currentView = this.dictionaryView;
    this.dictionaryView.draw();
  }

  // drawMinigamesView() {}

  // drawStatisticsView() {}
}

export default AppView;
