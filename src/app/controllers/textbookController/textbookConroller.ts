import TextbookView from '../../views/textbookView/textbookView';
import { State, state } from '../../models/api/state/state';
import ITextbookState from '../../models/api/interfaces/ITextbookState';
import getWordsTextbook from '../../models/api/api/getWordsTextbook';

class TextbookController {
  view: TextbookView;

  model: State;

  constructor(root: HTMLElement) {
    this.model = state;
    this.view = new TextbookView(
      root,
      this.model.textbookGroup,
      this.model.textbookPage,
      this.model.textbookMaxPage,
      this.model.words,
    );
    this.containerListener();
    this.getWordsTextbook();
  }

  async getWordsTextbook() {
    this.model.words = JSON.stringify(
      await getWordsTextbook(this.model.textbookGroup, this.model.textbookPage),
    );
    this.view.words = this.model.words;
    this.view.renderTextbook();
  }

  containerListener() {
    this.view.frontBlock.container.addEventListener('click', (e) => {
      const currAttrType = (e.target as HTMLInputElement).getAttribute('data-state');
      const currAttrVal = (e.target as HTMLInputElement).getAttribute('data-value');
      if (currAttrType && currAttrVal) {
        this.model[currAttrType as ITextbookState] = parseInt(currAttrVal, 10);
        console.log(this.model);
        this.view[currAttrType as ITextbookState] = parseInt(currAttrVal, 10);
      }
      if (currAttrType === 'textbookGroup') {
        this.model.textbookPage = 0;
        this.view.textbookPage = 0;
      }
      this.getWordsTextbook();
    });
  }
}

export default TextbookController;
