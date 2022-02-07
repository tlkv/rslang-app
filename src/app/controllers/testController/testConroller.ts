import TestView from '../../views/testView/testView';
import { State, state } from '../../models/api/state/state';
import testApi from '../../models/api/api/testApi';

class TestController {
  view: TestView;

  model: State;

  constructor(root: HTMLElement) {
    this.view = new TestView(root);
    this.model = state;
    this.customEventListener();
  }

  customEventListener() {
    this.view.frontBlock.container.addEventListener('click', async (e) => {
      console.log(
        'I catch Event! ',
        e,
        'showState + increase by 1 and DRAW IT',
        (this.model.currentPage += 1),
      );
      console.log('state now', state);
      this.view.frontBlockWrapper.container.innerHTML += `current state change ${
        state.currentPage
      } words data
      ${JSON.stringify(await testApi())} `; // appernd received data to current page
    });
  }
}

export default TestController;
