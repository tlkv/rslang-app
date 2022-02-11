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
      this.model.isAuth,
    );
  }

  containerListener() {
    this.view.frontBlock.container.addEventListener('click', (e) => {
      const currTarget = e.target as HTMLInputElement;
      if (currTarget.tagName !== 'BUTTON') {
        return;
      }

      const currAttrType = currTarget.getAttribute('data-state');
      const currAttrVal = currTarget.getAttribute('data-value');
      const currAudio = currTarget.getAttribute('data-audio');
      const currAudioMeaning = currTarget.getAttribute('data-audio-meaning');
      const currAudioExample = currTarget.getAttribute('data-audio-example');
      const difficultStatus = currTarget.getAttribute('data-add-difficult');
      const learnedStatus = currTarget.getAttribute('data-add-learned');

      if (currAttrType && currAttrVal) {
        this.model[currAttrType as ITextbookState] = parseInt(currAttrVal, 10);
        if (currAttrType === 'textbookGroup') {
          this.model.textbookPage = 0;
        }
        this.renderWordsTextbook();
      }

      if (currAudio && currAudioMeaning && currAudioExample) {
        this.handleAudio(currAudio, currAudioMeaning, currAudioExample);
      }

      if (difficultStatus) {
        currTarget.parentElement?.parentElement?.classList.add('textbook-card-difficult');
      }

      if (learnedStatus) {
        currTarget.parentElement?.parentElement?.classList.add('textbook-card-learned');
      }
    });
  }

  handleAudio(currAudio: string, currAudioMeaning: string, currAudioExample: string) {
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
}

export default TextbookController;
