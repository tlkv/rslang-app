import AuthorizationView from '../../views/authorizationView/authorizationView';
import { State, state } from '../../models/api/state/state';
import Api from '../../models/api/api/AuthApi';

class AuthorizationController {
  view: AuthorizationView;

  model: State;

  api: Api;

  constructor(root: HTMLElement) {
    this.view = new AuthorizationView(root);
    this.model = state;
    this.api = new Api();
    this.register();
    this.signIn();
  }

  register() {
    this.view.frontBlock.container.addEventListener('click', async (e) => {
      const target = e.target as HTMLElement;

      if (target.id === 'register-btn') {
        const email = this.view.frontBlock.container.querySelector('#email') as HTMLInputElement;
        const name = this.view.frontBlock.container.querySelector('#name') as HTMLInputElement;
        const password = this.view.frontBlock.container.querySelector(
          '#password',
        ) as HTMLInputElement;

        const resp = await this.api
          .registerUser(name.value, email.value, password.value)
          .then((response) => {
            if (response.isSucceeded) {
              this.model.isAuth = true;
            } else {
              this.view.chooseView();
            }
          });
      }
    });
  }

  signIn() {
    this.view.frontBlock.container.addEventListener('click', async (e) => {
      const target = e.target as HTMLElement;

      if (target.id !== 'signIn-btn') return;

      const email = this.view.frontBlock.container.querySelector('#email') as HTMLInputElement;
      const password = this.view.frontBlock.container.querySelector(
        '#password',
      ) as HTMLInputElement;

      const resp = await this.api.signInUser(email.value, password.value).then((response) => {
        if (response.isSucceeded) {
          this.model.isAuth = true;
        }
      });
    });
  }
}

export default AuthorizationController;
