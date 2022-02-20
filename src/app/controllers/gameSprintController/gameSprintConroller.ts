/* eslint-disable operator-linebreak */
import GameStartSprintView from '../../views/gameSprintView/GameStartSprintView';
import { State, state } from '../../models/api/state/state';
import { getWordsTextbook } from '../../models/api/api/getWordsTextbook';
import IMatchWord from '../../models/api/interfaces/IMatchWord';
import {
  FRONT_BLOCK_CONTENT_START,
  FRONT_BLOCK_CONTENT_GAME,
  FRONT_BLOCK_CONTENT_MODAL,
  createWordItem,
} from '../../views/gameSprintView/const';

class GameSprintController {
  view: GameStartSprintView;

  model: State;

  audio = new Audio();

  baseUrl = 'https://react-learnwords-example.herokuapp.com/';

  matchingWords: IMatchWord[] | undefined;

  totalTime: number;

  timer: NodeJS.Timeout | undefined;

  isGameStarted: boolean;

  currentWordIndex: number;

  correctCount: number;

  incorrectCount: number;

  correctWords: IMatchWord[];

  incorrectWords: IMatchWord[];

  level: number;

  pageStart: number;

  threeInRowCounter: number;

  scoreMultiplier: number;

  scoreCount: string;

  userId: string | null;

  constructor(root: HTMLElement) {
    this.view = new GameStartSprintView(root);
    this.model = state;
    this.totalTime = 60;
    this.currentWordIndex = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.level = 0;
    this.pageStart = 1;
    this.isGameStarted = false;
    this.threeInRowCounter = 0;
    this.scoreMultiplier = 10;
    this.scoreCount = '';
    this.correctWords = [];
    this.incorrectWords = [];
    this.userId = localStorage.getItem('userId');
    this.containerListener();
  }

  resetValues() {
    this.totalTime = 60;
    this.currentWordIndex = 0;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.threeInRowCounter = 0;
    this.scoreMultiplier = 10;
    this.correctWords = [];
    this.incorrectWords = [];
    this.isGameStarted = false;
  }

  containerListener() {
    this.view.frontBlock.container.addEventListener('click', async (e) => {
      if (!this.isGameStarted) {
        const startBtn = (e.target as HTMLElement).closest('#start-sprint-btn') as HTMLInputElement;
        const toWordsBtn = (e.target as HTMLElement).closest('#to-words-btn') as HTMLInputElement;
        const toResultsBtn = (e.target as HTMLElement).closest('#to-results-btn') as HTMLInputElement;
        const restartBtn = (e.target as HTMLElement).closest(
          '#restart-sprint-btn',
        ) as HTMLInputElement;
        if (startBtn) {
          const checkedInput = document.querySelector(
            'input[name="sprint-level"]:checked',
          ) as HTMLInputElement;
          this.level = +checkedInput.value;
          this.pageStart = 1;
          this.matchingWords = await this.getWords(this.level, this.pageStart);
          this.view.frontBlockWrapper.container.innerHTML = FRONT_BLOCK_CONTENT_GAME;
          this.startGame();
        } else if (restartBtn) {
          this.view.frontBlockWrapper.container.innerHTML = FRONT_BLOCK_CONTENT_START;
        } else if (toWordsBtn) {
          // aaa
          GameSprintController.showSeeMyWords();
        } else if (toResultsBtn) {
          GameSprintController.showResults();
        }
      } else {
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON') {
          if (target.classList.contains('right-btn')) {
            this.checkAnswer(true);
          } else if (target.classList.contains('wrong-btn')) {
            this.checkAnswer(false);
          }
        }
      }
    });

    // Keyboard controls
    this.view.frontBlock.container.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          this.moveArrow('left');
          break;
        case 'ArrowRight':
          this.moveArrow('right');
          break;
        case 'Enter':
          this.enterPress(e);
          break;
        default:
          break;
      }
    });

    this.view.frontBlock.container.setAttribute('tabindex', '0');
  }

  static showResults() {
    const resultsDiv = document.getElementById('modal-results') as HTMLElement;
    const wordListDiv = document.getElementById('word-list-container') as HTMLElement;
    resultsDiv.style.display = 'block';
    wordListDiv.style.display = 'none';
  }

  static showSeeMyWords() {
    const resultsDiv = document.getElementById('modal-results') as HTMLElement;
    const wordListDiv = document.getElementById('word-list-container') as HTMLElement;
    resultsDiv.style.display = 'none';
    wordListDiv.style.display = 'block';
  }

  setSeeWords() {
    // this.view.frontBlockWrapper.container.innerHTML = FRONT_BLOCK_CONTENT_WORDS;
    const wordListContainer = document.getElementById('word-list-container') as HTMLElement;
    const parser = new DOMParser();
    if (this.incorrectWords.length > 0) {
      const incorrectAnswersTitle = document.createElement('div');
      incorrectAnswersTitle.classList.add('word-list-title');
      incorrectAnswersTitle.innerHTML = 'Incorrect answers';
      wordListContainer.appendChild(incorrectAnswersTitle);
      const incorrectWordsContainer = document.createElement('div');
      incorrectWordsContainer.classList.add('word-list-wrong');
      wordListContainer.appendChild(incorrectWordsContainer);
      this.incorrectWords.forEach((el) => {
        const wordItem = parser.parseFromString(createWordItem(el.eng, el.ru), 'text/html');
        const wordItemSound = wordItem.getElementById('word-sound') as HTMLElement;
        wordItemSound.onclick = () => {
          this.playAudio(`${this.baseUrl}${el.audio}`);
        };
        const child = wordItem.body.firstElementChild;
        if (child) {
          incorrectWordsContainer.appendChild(child);
        }
      });
    }
    if (this.correctWords.length > 0) {
      const correctAnswersTitle = document.createElement('div');
      correctAnswersTitle.classList.add('word-list-title');
      correctAnswersTitle.innerHTML = 'Correct answers';
      wordListContainer.appendChild(correctAnswersTitle);
      const correctWordsContainer = document.createElement('div');
      correctWordsContainer.classList.add('word-list-right');
      wordListContainer.appendChild(correctWordsContainer);
      this.correctWords.forEach((el) => {
        const wordItem = parser.parseFromString(createWordItem(el.eng, el.ru), 'text/html');
        const wordItemSound = wordItem.getElementById('word-sound') as HTMLElement;
        wordItemSound.onclick = () => {
          this.playAudio(`${this.baseUrl}${el.audio}`);
        };
        const child = wordItem.body.firstElementChild;
        if (child) {
          correctWordsContainer.appendChild(child);
        }
      });
    }
  }

  async playAudio(path: string) {
    this.audio.src = path;
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      await playPromise.then(() => {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.play();
      });
    } else {
      this.audio.play();
    }
  }

  async startPress() {
    const checkedInput = document.querySelector(
      'input[name="sprint-level"]:checked',
    ) as HTMLInputElement;

    if (!checkedInput) {
      alert('Please select a level');
      return;
    }
    this.level = +checkedInput.value;
    this.pageStart = 1;
    this.matchingWords = await this.getWords(this.level, this.pageStart);
    this.view.frontBlockWrapper.container.innerHTML = FRONT_BLOCK_CONTENT_GAME;
    this.startGame();
  }

  enterPress(e: Event) {
    if (!this.isGameStarted) {
      // in start menu
      this.startPress();
    }
  }

  moveArrow(direction: string) {
    if (!this.isGameStarted) {
      // in start menu - controll radio btns
      // get the checked radio btn
      const selectedOption = document.querySelector(
        'input[type="radio"]:checked',
      ) as HTMLInputElement;

      // check if it exists
      if (selectedOption) {
        if (direction === 'right') {
          const parent = selectedOption.parentElement as HTMLElement;
          if (parent.nextElementSibling) {
            const sibling = parent.nextElementSibling as HTMLElement;
            (sibling.firstElementChild as HTMLInputElement).checked = true;
          }
        } else {
          // else go left
          const parent = selectedOption.parentElement as HTMLElement;
          if (parent.previousElementSibling) {
            const sibling = parent.previousElementSibling as HTMLElement;
            (sibling.firstElementChild as HTMLInputElement).checked = true;
          }
        }
      } else {
        (document.querySelector('input[type="radio"]:first-of-type') as HTMLInputElement).checked = true;
      }
    } else if (this.isGameStarted) {
      if (direction === 'right') {
        this.checkAnswer(false);
      } else {
        this.checkAnswer(true);
      }
    }
  }

  checkAnswer(answer: boolean) {
    if (!this.matchingWords || this.totalTime <= 0) return;
    const word = this.matchingWords[this.currentWordIndex];
    const countDiv = document.getElementById('score-count') as HTMLElement;
    const pointsDiv = document.getElementById('score-info') as HTMLElement;
    const alertRight = document.querySelector('.alert-right') as HTMLElement;
    const alertWrong = document.querySelector('.alert-wrong') as HTMLElement;
    if (word.match === answer) {
      this.audio.src = '../../../assets/correct-sound.mp3';
      this.audio.play();
      this.correctCount += 1;
      this.threeInRowCounter += 1;
      this.correctWords.push(word);
      if (this.threeInRowCounter === 3) {
        this.scoreMultiplier *= 2;
        this.scoreMultiplier = this.scoreMultiplier > 80 ? 80 : this.scoreMultiplier;
        this.threeInRowCounter = 0;
      }
      pointsDiv.innerHTML = `Points: x${this.scoreMultiplier}`;
      countDiv.innerHTML = `${+countDiv.innerHTML + this.scoreMultiplier}`;
      // trigger correct animation
      if (alertRight.style.animationName === 'fadeOut1') {
        alertRight.style.animationName = 'fadeOut2';
      } else {
        alertRight.style.animationName = 'fadeOut1';
      }
      this.updateLearnedWord(word.id, false);
    } else {
      this.audio.src = '../../../assets/incorrect-sound.mp3';
      this.audio.play();
      this.incorrectCount += 1;
      this.threeInRowCounter = 0;
      this.incorrectWords.push(word);
      this.scoreMultiplier = 10;
      pointsDiv.innerHTML = `Points: x${this.scoreMultiplier}`;
      countDiv.innerHTML = `${+countDiv.innerHTML - 10 < 0 ? 0 : +countDiv.innerHTML - 10}`;
      // trigger incorrect animation
      if (alertWrong.style.animationName === 'fadeOut1') {
        alertWrong.style.animationName = 'fadeOut2';
      } else {
        alertWrong.style.animationName = 'fadeOut1';
      }
      this.updateLearnedWord(word.id, true);
    }
    this.nextWord();
  }

  async updateLearnedWord(wordId: string, remove: boolean) {
    if (this.userId) {
      if (remove) {
        // remove word from learned words
      } else {
        // get user word from the server using userId and wordId
      // if response 201 - not found -> post the word using api with userId and wordId
        // add word to learned words
      }
    }
  }

  async nextWord() {
    if (!this.matchingWords) return;
    this.currentWordIndex += 1;
    if (this.currentWordIndex >= this.matchingWords.length) {
      this.currentWordIndex = 0;
      this.pageStart += 2;
      if (this.pageStart > 30) return;
      this.matchingWords = await this.getWords(this.level, this.pageStart);
    }
    this.setWords();
  }

  setWords() {
    if (!this.matchingWords || this.isGameStarted === false) return;
    const word = this.matchingWords[this.currentWordIndex];
    (document.getElementById('en-word') as HTMLElement).innerHTML = word.eng;
    (document.getElementById('ru-word') as HTMLElement).innerHTML = word.ru;
  }

  calculateResult() {
    const allAnswers = this.correctCount + this.incorrectCount;
    let percent: number;
    if (allAnswers > 0) {
      percent = (this.correctCount * 100) / allAnswers;
    } else {
      percent = 0;
    }
    return Math.round(percent);
  }

  updateTime() {
    if (this.isGameStarted === false) return;
    (document.getElementById('sprint-timer') as HTMLElement).innerHTML = `${this.totalTime}`;
    if (this.totalTime <= 0) {
      this.isGameStarted = false;
      this.scoreCount = (document.getElementById('score-count') as HTMLElement).innerHTML;
      // calculates scores and paste it into the modal view

      // calls a modal view
      this.view.frontBlockWrapper.container.innerHTML = FRONT_BLOCK_CONTENT_MODAL;
      const totalScore = document.getElementById('total-score') as HTMLElement;
      totalScore.innerHTML = this.scoreCount;
      if (+this.scoreCount === 0) {
        (document.getElementById('result-message') as HTMLElement).innerHTML = 'Sorry! But you can do much better';
      }
      const percent = this.calculateResult();
      (document.getElementById('percent-circle') as HTMLElement).style.strokeDashoffset = (
        4.4 *
        (100 - percent)
      ).toString();
      (document.getElementById('percentage-amount') as HTMLElement).innerHTML = percent.toString();
      (document.getElementById('correct-count') as HTMLElement).innerHTML =
        this.correctCount.toString();
      (document.getElementById('incorrect-count') as HTMLElement).innerHTML =
        this.incorrectCount.toString();

      // set see my words
      this.setSeeWords();
      // select elements and insert innerHtml scores
      // restart btn has the same id as the start btn
    } else {
      this.totalTime -= 1;
      this.timer = setTimeout(this.updateTime.bind(this), 1000);
    }
  }

  async startGame() {
    this.resetValues();
    this.isGameStarted = true;
    this.setWords();
    this.timer = setTimeout(this.updateTime.bind(this), 1000);
  }

  static shuffle(array: IMatchWord[]) {
    const arr = array;
    // Fisher-Yates shuffle algorithm
    // start from last element and go backwards
    for (let i = array.length - 1; i > 0; i -= 1) {
      // pick random item from current end i to remaining items towards the start
      const j = Math.floor(Math.random() * (i + 1));
      // and swap
      const temp = arr[i];
      arr[i] = array[j];
      arr[j] = temp;
    }
    return arr;
  }

  async getWords(level: number, pageStart: number) {
    // eslint-disable-next-line max-len
    const words1 = await getWordsTextbook(level, pageStart, this.model.isAuth);
    const words2 = await getWordsTextbook(level, pageStart + 1, this.model.isAuth);
    this.model.words = words1.concat(words2);
    const arr = this.model.words.map((w) => {
      const obj = Object.create(null);
      Object.assign(
        obj,
        { eng: w.word },
        { ru: w.wordTranslate },
        { match: true },
        // eslint-disable-next-line no-underscore-dangle
        { id: w._id },
        { audio: w.audio },
      );
      return obj;
    });
    const shuffledArr = GameSprintController.shuffle(arr);
    const halfLen = shuffledArr.length / 2;
    for (let i = 0; i < halfLen; i += 1) {
      const startWord = shuffledArr[i];
      const endWord = shuffledArr[shuffledArr.length - 1 - i];
      startWord.ru = endWord.ru;
      startWord.match = false;
    }
    return GameSprintController.shuffle(shuffledArr);
  }
}

export default GameSprintController;
