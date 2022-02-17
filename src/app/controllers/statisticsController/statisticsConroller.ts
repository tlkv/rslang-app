import StatisticsView from '../../views/statisticsView/statisticsView';
import { State, state } from '../../models/api/state/state';
import StatisticApi from '../../models/api/api/statisticApi';

class StatisticsController {
  view: StatisticsView;

  model: State;

  api: StatisticApi;

  constructor(root: HTMLElement) {
    this.view = new StatisticsView(root);
    this.model = state;
    this.api = new StatisticApi();
  }
}

export default StatisticsController;
