import AuthorizationView from '../../views/authorizationView/authorizationView';
import { State, state } from '../../models/api/state/state';

class AuthorizationController {
  view: AuthorizationView;

  model: State;

  constructor(root: HTMLElement) {
    this.view = new AuthorizationView(root);
    this.model = state;
  }
}

export default AuthorizationController;
