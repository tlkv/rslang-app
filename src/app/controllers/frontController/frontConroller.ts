import FrontView from '../../views/frontView/frontView';
import { State, state } from '../../models/api/state/state';

class FrontController {
  view: FrontView;

  model: State;

  constructor(root: HTMLElement) {
    this.view = new FrontView(root);
    this.model = state;
  }
}

export default FrontController;
