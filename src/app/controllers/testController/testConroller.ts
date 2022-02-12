import TestView from '../../views/testView/testView';
import { State, state } from '../../models/api/state/state';

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
      const current = e.target as HTMLElement;

      if (current.classList.contains('auth-state')) {
        this.model.isAuth = !this.model.isAuth;
        console.log('this.model.isAuth', this.model.isAuth);
      }

      /* console.log(
        'I catch Event! ',
        e,
        'showState + increase by 1 and DRAW IT',
        (this.model.textbookPage += 1),
      );
      console.log('state now', state);
      this.view.frontBlockWrapper.container.innerHTML += `textbook state change ${
        state.textbookPage
      } words data
      ${JSON.stringify(await testApi())} `; // appernd received data to textbook page */
    });
  }
}

export default TestController;
