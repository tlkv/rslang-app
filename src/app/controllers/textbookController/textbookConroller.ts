import TextbookView from '../../views/textbookView/textbookView';
import { State, state } from '../../models/api/state/state';
import ITextbookState from '../../models/api/interfaces/ITextbookState';
import { getWordsTextbook, createDifficultWord } from '../../models/api/api/getWordsTextbook';

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
    this.handleWordsUpdate();
  }

  async handleWordsUpdate() {
    this.model.words = await getWordsTextbook(this.model.textbookGroup, this.model.textbookPage);
    this.renderWordsTextbookView();
  }

  renderWordsTextbookView() {
    this.pauseAudio();
    this.view.renderTextbook(
      this.model.textbookGroup,
      this.model.textbookPage,
      this.model.textbookMaxPage,
      this.model.words,
      this.model.isAuth,
      this.model.textbookShowDifficult,
      this.model.textbookShowLearned,
    );
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
    this.model.textbookShowDifficult = false;
    this.model.textbookShowLearned = false;
    const currAttrType = currTarget.getAttribute('data-state');
    const currAttrVal = currTarget.getAttribute('data-value');
    if (currAttrType && currAttrVal) {
      this.model[currAttrType as ITextbookState] = parseInt(currAttrVal, 10);
      if (currAttrType === 'textbookGroup') {
        this.model.textbookPage = 0;
      }
      this.handleWordsUpdate();
    }
  }

  handleDifficultWords() {
    this.model.textbookShowDifficult = true;
    this.model.textbookShowLearned = false;
    this.handleWordsUpdate();
  }

  handleLearnedWords() {
    this.model.textbookShowDifficult = false;
    this.model.textbookShowLearned = true;
    this.handleWordsUpdate();
  }

  static async handleAddDifficult(currTarget: HTMLInputElement) {
    await createDifficultWord(currTarget.getAttribute('data-add-difficult') as string);
    currTarget.parentElement
      ?.querySelector('.textbook-card-word')
      ?.classList.add('textbook-card-difficult');
    // this.handleWordsUpdate();
  }

  static handleAddLearned(currTarget: HTMLInputElement) {
    currTarget.parentElement?.parentElement?.classList.add('textbook-card-learned');
    // this.handleWordsUpdate();
  }

  containerListener() {
    this.view.frontBlock.container.addEventListener('click', (e) => {
      const currTarget = e.target as HTMLInputElement;
      const currAction = currTarget.getAttribute('data-action');
      if (!currAction) {
        return;
      }

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
        case 'textbook-show-difficult':
          this.handleDifficultWords();
          break;
        case 'textbook-show-learned':
          this.handleLearnedWords();
          break;
        case 'textbook-add-difficult':
          TextbookController.handleAddDifficult(currTarget);
          break;
        case 'textbook-add-learned':
          TextbookController.handleAddLearned(currTarget);
          break;
        default:
          break;
      }
    });
  }
}

export default TextbookController;
