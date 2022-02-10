import TextbookView from '../../views/textbookView/textbookView';
import { State, state } from '../../models/api/state/state';
import ITextbookState from '../../models/api/interfaces/ITextbookState';
import getWordsTextbook from '../../models/api/api/getWordsTextbook';

class TextbookController {
  view: TextbookView;

  model: State;

  audio = new Audio();

  audioExample = new Audio();

  audioMeaning = new Audio();

  constructor(root: HTMLElement) {
    this.model = state;
    this.view = new TextbookView(root);
    this.containerListener();
    this.renderWordsTextbook();
  }

  async renderWordsTextbook() {
    this.model.words = await getWordsTextbook(this.model.textbookGroup, this.model.textbookPage);

    this.audio.pause();
    this.audioMeaning.pause();
    this.audioExample.pause();

    this.view.renderTextbook(
      this.model.textbookGroup,
      this.model.textbookPage,
      this.model.textbookMaxPage,
      this.model.words,
    );
  }

  containerListener() {
    this.view.frontBlock.container.addEventListener('click', (e) => {
      const currAttrType = (e.target as HTMLInputElement).getAttribute('data-state');
      const currAttrVal = (e.target as HTMLInputElement).getAttribute('data-value');
      const currAudio = (e.target as HTMLInputElement).getAttribute('data-audio');
      const currAudioMeaning = (e.target as HTMLInputElement).getAttribute('data-audio-meaning');
      const currAudioExample = (e.target as HTMLInputElement).getAttribute('data-audio-example');

      if (currAttrType && currAttrVal) {
        this.model[currAttrType as ITextbookState] = parseInt(currAttrVal, 10);
        if (currAttrType === 'textbookGroup') {
          this.model.textbookPage = 0;
        }
        this.renderWordsTextbook();
      }

      if (currAudio && currAudioMeaning && currAudioExample) {
        this.audio.src = currAudio;
        this.audioMeaning.src = currAudioMeaning;
        this.audioExample.src = currAudioExample;
        this.audio.addEventListener('ended', () => {
          this.audioMeaning.play();
        });
        this.audioMeaning.addEventListener('ended', () => {
          this.audioExample.play();
        });
        this.audio.play();
      }
    });
  }
}

export default TextbookController;
