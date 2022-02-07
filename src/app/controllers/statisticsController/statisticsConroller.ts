import StatisticsView from '../../views/statisticsView/statisticsView';
import { State, state } from '../../models/api/state/state';

class StatisticsController {
  view: StatisticsView;

  model: State;

  constructor(root: HTMLElement) {
    this.view = new StatisticsView(root);
    this.model = state;
  }
}

export default StatisticsController;
