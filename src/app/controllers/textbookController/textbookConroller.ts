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

  pauseAudio() {
    this.audio.pause();
    this.audioMeaning.pause();
    this.audioExample.pause();
  }

  handleAudio(currTarget: HTMLInputElement) {
    const currAudio = currTarget.getAttribute('data-audio');
    const currAudioMeaning = currTarget.getAttribute('data-audio-meaning');
    const currAudioExample = currTarget.getAttribute('data-audio-example');
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
  }

  handleGroupsAndPagination(currTarget: HTMLInputElement) {
    const currAttrType = currTarget.getAttribute('data-state');
    const currAttrVal = currTarget.getAttribute('data-value');
    if (currAttrType && currAttrVal) {
      this.model[currAttrType as ITextbookState] = parseInt(currAttrVal, 10);
      if (currAttrType === 'textbookGroup') {
        this.model.textbookPage = 0;
      }
      this.renderWordsTextbook();
    }
  }

  async renderWordsTextbook() {
    this.model.words = await getWordsTextbook(this.model.textbookGroup, this.model.textbookPage);
    this.pauseAudio();
    this.view.renderTextbook(
      this.model.textbookGroup,
      this.model.textbookPage,
      this.model.textbookMaxPage,
      this.model.words,
      this.model.isAuth,
    );
  }

  async renderDifficultWords() {
    this.model.words = await getWordsTextbook(this.model.textbookGroup, this.model.textbookPage); //
    this.pauseAudio();
    this.view.renderDifficultWords(this.model.words, this.model.isAuth);
    console.log('diff words'); //
  }

  containerListener() {
    this.view.frontBlock.container.addEventListener('click', (e) => {
      const currTarget = e.target as HTMLInputElement;
      const currAction = currTarget.getAttribute('data-action');

      if (!currAction) {
        return;
      }

      /* if (currAction === 'textbook-group' || currAction === 'textbook-pagination') {
        const currAttrType = currTarget.getAttribute('data-state');
        const currAttrVal = currTarget.getAttribute('data-value');
        if (currAttrType && currAttrVal) {
          this.model[currAttrType as ITextbookState] = parseInt(currAttrVal, 10);
          if (currAttrType === 'textbookGroup') {
            this.model.textbookPage = 0;
          }
          this.renderWordsTextbook();
        }
      } */

      if (currAction === 'textbook-add-learned') {
        const learnedStatus = currTarget.getAttribute('data-add-learned');
        if (learnedStatus) {
          currTarget.parentElement?.parentElement?.classList.toggle('textbook-card-learned');
        }
      }

      if (currAction === 'textbook-add-difficult') {
        const difficultStatus = currTarget.getAttribute('data-add-difficult');
        if (difficultStatus) {
          currTarget.parentElement
            ?.querySelector('.textbook-card-word')
            ?.classList.toggle('textbook-card-difficult');
        }
      }

      if (currAction === 'textbook-show-difficult') {
        this.model.textbookShowDifficult = true;
        this.model.textbookShowLearned = false;
        this.renderDifficultWords();
      }

      if (currAction === 'textbook-show-learned') {
        console.log('textbook-show-learned');
      }

      // ref
      switch (currAction) {
        case 'textbook-audio':
          this.handleAudio(currTarget);
          break;
        case 'textbook-group':
          this.handleGroupsAndPagination(currTarget);
          break;
        case 'textbook-pagination':
          this.handleGroupsAndPagination(currTarget);
          break;
        default:
          break;
      }
    });
  }
}

export default TextbookController;
