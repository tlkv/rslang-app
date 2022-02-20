import TextbookView from '../../views/textbookView/textbookView';
import { State, state } from '../../models/api/state/state';
import ITextbookState from '../../models/api/interfaces/ITextbookState';
import {
  getWordsTextbook,
  createDifficultWord,
  createLearnedWord,
  filterLearnedWords,
  filterDifficultWords,
  removeDifficultWord,
  removeLearnedWord,
} from '../../models/api/api/getWordsTextbook';

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
    console.log('this.model', this.model);

    if (this.model.isAuth && this.model.textbookShowDifficult) {
      this.model.words = await filterDifficultWords();
    } else if (this.model.isAuth && this.model.textbookShowLearned) {
      this.model.words = await filterLearnedWords();
    } else {
      this.model.words = await getWordsTextbook(
        this.model.textbookGroup,
        this.model.textbookPage,
        this.model.isAuth,
      );
    }
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

  async handleDifficultWords() {
    this.model.textbookShowDifficult = true;
    this.model.textbookShowLearned = false;
    this.handleWordsUpdate();
  }

  async handleLearnedWords() {
    this.model.textbookShowDifficult = false;
    this.model.textbookShowLearned = true;
    this.handleWordsUpdate();
  }

  async handleAddDifficult(currTarget: HTMLInputElement) {
    await createDifficultWord(currTarget.getAttribute('data-add-difficult') as string);
    this.handleWordsUpdate();
  }

  async handleAddLearned(currTarget: HTMLInputElement) {
    await createLearnedWord(currTarget.getAttribute('data-add-learned') as string);
    this.handleWordsUpdate();
  }

  async handleRemDifficult(currTarget: HTMLInputElement) {
    await removeDifficultWord(currTarget.getAttribute('data-rem-difficult') as string);
    this.handleWordsUpdate();
  }

  async handleRemLearned(currTarget: HTMLInputElement) {
    await removeLearnedWord(currTarget.getAttribute('data-rem-learned') as string);
    this.handleWordsUpdate();
  }

  handleSearch(currTarget: HTMLInputElement) {
    const query = currTarget.value.toLowerCase();
    const cards = this.view.frontBlockWrapper.container.querySelectorAll('.textbook-card-item');
    cards.forEach((item) => {
      const word = item.querySelector('.textbook-card-word')?.textContent;
      if (query.length === 0 || word?.toLowerCase().includes(query)) {
        item.classList.remove('hidden-card');
      } else {
        item.classList.add('hidden-card');
      }
    });
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
          this.handleAddDifficult(currTarget);
          break;
        case 'textbook-add-learned':
          this.handleAddLearned(currTarget);
          break;
        case 'textbook-rem-difficult':
          this.handleRemDifficult(currTarget);
          break;
        case 'textbook-rem-learned':
          this.handleRemLearned(currTarget);
          break;
        default:
          break;
      }
    });

    this.view.frontBlock.container.addEventListener('input', (e) => {
      const currTarget = e.target as HTMLInputElement;
      const currAction = currTarget.getAttribute('data-action');
      if (currAction === 'search') {
        this.handleSearch(currTarget);
      }
    });
  }
}

export default TextbookController;
