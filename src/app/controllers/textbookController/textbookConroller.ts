import TextbookView from '../../views/textbookView/textbookView';
import { State, state } from '../../models/api/state/state';

class TextbookController {
  view: TextbookView;

  model: State;

  constructor(root: HTMLElement) {
    this.view = new TextbookView(root);
    this.model = state;
  }
}

export default TextbookController;
