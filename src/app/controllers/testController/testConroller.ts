import TestView from '../../views/testView/testView';
import { State, state } from '../../models/api/state/state';
import { getStatistics, resetStatistics } from '../../models/api/api/getWordsTextbook';

class TestController {
  view: TestView;

  model: State;

  constructor(root: HTMLElement) {
    this.view = new TestView(root);
    this.model = state;
    this.handleStatsUpdate();
    this.containerListener();
  }

  async handleStatsUpdate() {
    if (this.model.isAuth) {
      this.model.stats = await getStatistics();
    }
    this.renderWordsStatsView(this.model.isAuth);
  }

  renderWordsStatsView(isAuth: boolean) {
    if (isAuth) {
      this.view.renderStats(this.model.stats, this.model.isAuth);
    }
  }

  containerListener() {
    this.view.frontBlock.container.addEventListener('click', async (e) => {
      const currTarget = e.target as HTMLInputElement;
      if (currTarget.classList.contains('reset-stats-button')) {
        await resetStatistics();
        window.location.reload();
      }
    });
  }
}

export default TestController;
