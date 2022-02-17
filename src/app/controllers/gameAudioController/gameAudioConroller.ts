import GameAudioView from '../../views/gameAudioView/gameAudioView';
import { State, state } from '../../models/api/state/state';
import getWordsTextbook from '../../models/api/api/getWordsTextbook';
import {
  FRONT_BLOCK_CONTENT_START,
  FRONT_BLOCK_CONTENT_GAME,
  FRONT_BLOCK_CONTENT_MODAL,
} from '../../views/gameAudioView/const';
import IAudioWord from '../../models/api/interfaces/IAudioWord';

class GameAudioController {
  view: GameAudioView;

  model: State;

  audio = new Audio();

  baseUrl = 'https://react-learnwords-example.herokuapp.com/';

  audioWords: IAudioWord[] | undefined;

  isGameStarted: boolean;

  isSkippedPressed: boolean;

  level: number;

  pageStart: number;

  correctWords: string[];

  incorrectWords: string[];

  currentWordIndex: number;

  currentMatchIndex: number;

  constructor(root: HTMLElement) {
    this.view = new GameAudioView(root);
    this.model = state;
    this.isGameStarted = false;
    this.isSkippedPressed = false;
    this.level = 1;
    this.pageStart = 0;
    this.correctWords = [];
    this.incorrectWords = [];
    this.currentWordIndex = 0;
    this.currentMatchIndex = 0;
    this.containerListener();
  }

  containerListener() {
    this.view.frontBlock.container.addEventListener('click', async (e) => {
      if (!this.isGameStarted) {
        const startBtn = (e.target as HTMLElement).closest('#start-audio-btn') as HTMLInputElement;
        const restartBtn = (e.target as HTMLElement).closest(
          '#restart-audio-btn',
        ) as HTMLInputElement;
        if (startBtn) {
          const checkedInput = document.querySelector(
            'input[name="audio-level"]:checked',
          ) as HTMLInputElement;
          if (!checkedInput.value) {
            alert('Please select a level');
            return;
          }
          this.level = +checkedInput.value;
          console.log(this.level);
          this.pageStart = 1;
          this.audioWords = await this.getWords(this.level, this.pageStart);
          this.view.frontBlockWrapper.container.innerHTML = FRONT_BLOCK_CONTENT_GAME;
          this.startGame();
        }
      }
    });
  }

  async startGame() {
    this.resetValues();
    this.isGameStarted = true;
    this.setWords();
  }

  setWords() {
    // TODO check if currentWordIndex > audioWords.length -> end game
    if (!this.audioWords || this.isGameStarted === false || this.currentWordIndex > 10) return;
    const question = this.audioWords[this.currentWordIndex];
    console.log(question, this.currentWordIndex);
    this.currentMatchIndex = question.matchIndex;
    this.audio.src = `${this.baseUrl}${question.audio}`;
    console.log(this.audio.src);
    (document.getElementById('audio-word-player') as HTMLElement).onclick = () => {
      console.log(this.audio.src, 'inside audio');
      this.audio.play();
    };
    const btns = (document.querySelectorAll('.audio-word-btn') as NodeList);
    btns.forEach((btn, i) => {
      const b = btn as HTMLInputElement;
      b.innerHTML = question.options[i];
      b.addEventListener('click', (e) => {
        this.checkAnswer();
      });
    });
    const skipBtn = document.getElementById('skip-btn') as HTMLInputElement;
    skipBtn.innerHTML = 'Skip';
    console.log(skipBtn);
    this.isSkippedPressed = false;
    console.log('skipped', this.isSkippedPressed);
    skipBtn.onclick = this.skipQuestions.bind(this);
  }

  skipQuestions(e: Event) {
    console.log('start skip q', this.isSkippedPressed);
    const btn = e.target as HTMLInputElement;
    if (this.isSkippedPressed) {
      this.currentWordIndex += 1;
      this.isSkippedPressed = false;
      console.log('skipped inside if', this.isSkippedPressed);
      this.setWords();
      return;
    }
    this.isSkippedPressed = true;
    btn.innerHTML = 'Next';
    console.log(btn);
    console.log('skipped outside if', this.isSkippedPressed);
  }

  checkAnswer() {
    console.log('check answer', this.level);
  }

  resetValues() {
    this.currentWordIndex = 0;
    this.correctWords = [];
    this.incorrectWords = [];
    this.isGameStarted = false;
  }

  static shuffle(array: string[]) {
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
    const words1 = await getWordsTextbook(level, pageStart);
    this.model.words = words1;
    const arr = [];
    let usedWords = [];
    for (let i = 0; i < words1.length; i += 1) {
      const word = words1[i];
      usedWords.push(word.wordTranslate);
      // get 4 other words
      while (usedWords.length < 5) {
        // get a random word
        let randomWord = words1[Math.floor(Math.random() * words1.length)].wordTranslate;
        while (usedWords.includes(randomWord)) {
          // if used word already contains a random word, then find another random word
          randomWord = words1[Math.floor(Math.random() * words1.length)].wordTranslate;
        }
        usedWords.push(randomWord);
      }
      // all 5 words found
      // shuffle used words
      const shuffledWords = GameAudioController.shuffle(usedWords);
      const correctIndex = shuffledWords.indexOf(word.wordTranslate);
      const wordObj = {
        audio: word.audio,
        options: shuffledWords,
        matchIndex: correctIndex,
        image: word.image,
      };
      arr.push(wordObj);
      usedWords = [];
    }
    // select 10 random words from arr
    return arr.sort(() => Math.random() - Math.random()).slice(0, 10);
  }
}

export default GameAudioController;
