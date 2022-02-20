import TestView from '../../views/testView/testView';
import { State, state } from '../../models/api/state/state';
import IStats from '../../models/api/interfaces/IStats';
import { getStatistics, resetStatistics } from '../../models/api/api/getWordsTextbook';

class TestController {
  view: TestView;

  model: State;

  constructor(root: HTMLElement) {
    this.view = new TestView(root);
    this.model = state;
    this.handleStatsUpdate();
    // this.customEventListener();
    this.containerListener();
  }

  async handleStatsUpdate() {
    console.log('test stats', this.model);

    if (this.model.isAuth) {
      this.model.stats = await getStatistics();
    } else {
      console.log('not auth');
    }
    this.renderWordsStatsView(this.model.isAuth);
  }

  renderWordsStatsView(isAuth: boolean) {
    console.log('stats TEST this.model.stats', this.model.stats);
    if (isAuth) {
      this.view.renderStats(this.model.stats, this.model.isAuth);
    } else {
      console.log('not auth - no render');
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

  /* customEventListener() {
    this.view.frontBlock.container.addEventListener('click', async (e) => {
      const current = e.target as HTMLElement;

      if (current.classList.contains('auth-state')) {
        this.model.isAuth = !this.model.isAuth;
        this.model.textbookGroup = 0;
        this.model.textbookPage = 0;
        this.model.textbookShowDifficult = false;
        this.model.textbookShowLearned = false;
        console.log('this.model.isAuth', this.model.isAuth);
      }

      console.log(
        'I catch Event! ',
        e,
        'showState + increase by 1 and DRAW IT',
        (this.model.textbookPage += 1),
      );
      console.log('state now', state);
      this.view.frontBlockWrapper.container.innerHTML += `textbook state change ${
        state.textbookPage
      } words data
      ${JSON.stringify(await testApi())} `; // appernd received data to textbook page
    });
  } */
}

export default TestController;
