import TextbookView from '../../views/textbookView/textbookView';
import { State, state } from '../../models/api/state/state';
import ITextbookState from '../../models/api/interfaces/ITextbookState';

class TextbookController {
  view: TextbookView;

  model: State;

  constructor(root: HTMLElement) {
    this.model = state;
    this.view = new TextbookView(
      root,
      this.model.textbookCategory,
      this.model.textbookPage,
      this.model.textbookMaxPage,
    );
    this.containerListener();
  }

  containerListener() {
    this.view.frontBlock.container.addEventListener('click', async (e) => {
      const currAttrType = (e.target as HTMLInputElement).getAttribute('data-state');
      const currAttrVal = (e.target as HTMLInputElement).getAttribute('data-value');
      if (currAttrType && currAttrVal) {
        this.model[currAttrType as ITextbookState] = parseInt(currAttrVal, 10);
        console.log(this.model);
        this.view[currAttrType as ITextbookState] = parseInt(currAttrVal, 10);
      }
      if (currAttrType === 'textbookCategory') {
        this.model.textbookPage = 0;
        this.view.textbookPage = 0;
      }
      this.view.renderTextbook();
    });
  }
}

export default TextbookController;
