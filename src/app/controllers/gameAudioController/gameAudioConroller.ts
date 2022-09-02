/* eslint-disable operator-linebreak */
import GameAudioView from '../../views/gameAudioView/gameAudioView';
import { State, state } from '../../models/api/state/state';
import {
  addNewWordsStats,
  createLearnedWord,
  getWordsTextbook,
  percentStats,
  removeLearnedStats,
  removeLearnedWord,
} from '../../models/api/api/getWordsTextbook';
import {
  FRONT_BLOCK_CONTENT_START,
  FRONT_BLOCK_CONTENT_GAME,
  FRONT_BLOCK_CONTENT_MODAL,
  FRONT_BLOCK_CONTENT_WORDS,
  createWordItem,
} from '../../views/gameAudioView/const';
import IAudioWord from '../../models/api/interfaces/IAudioWord';

class GameAudioController {
  view: GameAudioView;

  model: State;

  audio = new Audio();

  baseUrl = 'https://rslang29.onrender.com/';

  audioWords: IAudioWord[] | undefined;

  isGameStarted: boolean;

  isSkippedPressed: boolean;

  level: number;

  pageStart: number;

  correctWords: string[];

  incorrectWords: string[];

  currentWordIndex: number;

  currentMatchIndex: number;

  userId: string | null;

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
    this.userId = localStorage.getItem('userId');
    this.containerListener();
  }

  containerListener() {
    this.view.frontBlock.container.addEventListener('click', async (e) => {
      if (!this.isGameStarted) {
        const startBtn = (e.target as HTMLElement).closest('#start-audio-btn') as HTMLInputElement;
        const restartBtn = (e.target as HTMLElement).closest(
          '#restart-sprint-btn',
        ) as HTMLInputElement;
        const toWordsBtn = (e.target as HTMLElement).closest('#to-words-btn') as HTMLInputElement;
        const toResultsBtn = (e.target as HTMLElement).closest(
          '#to-results-btn',
        ) as HTMLInputElement;
        if (startBtn) {
          this.startPress();
        } else if (restartBtn) {
          this.view.frontBlockWrapper.container.innerHTML = FRONT_BLOCK_CONTENT_START;
        } else if (toWordsBtn) {
          // this.showWords();
          GameAudioController.showSeeMyWords();
        } else if (toResultsBtn) {
          GameAudioController.showResults();
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
        case 'ArrowUp': {
          if (this.audioWords) {
            const question = this.audioWords[this.currentWordIndex];
            this.playAudio(`${this.baseUrl}${question.audio}`);
          }
          break;
        }
        case 'Enter':
          this.enterPress(e);
          break;
        default:
          break;
      }
    });

    this.view.frontBlock.container.setAttribute('tabindex', '0');
  }

  static showSeeMyWords() {
    const resultsDiv = document.getElementById('modal-results') as HTMLElement;
    const wordListDiv = document.getElementById('word-list-container') as HTMLElement;
    const seeMyWordsBtn = document.getElementById('to-words-btn') as HTMLInputElement;
    const resultsBtn = document.getElementById('to-results-btn') as HTMLInputElement;
    resultsDiv.style.display = 'none';
    wordListDiv.style.display = 'block';
    seeMyWordsBtn.classList.add('active');
    resultsBtn.classList.remove('active');
  }

  static showResults() {
    const resultsDiv = document.getElementById('modal-results') as HTMLElement;
    const wordListDiv = document.getElementById('word-list-container') as HTMLElement;
    const seeMyWordsBtn = document.getElementById('to-words-btn') as HTMLInputElement;
    const resultsBtn = document.getElementById('to-results-btn') as HTMLInputElement;
    resultsDiv.style.display = 'block';
    wordListDiv.style.display = 'none';
    seeMyWordsBtn.classList.remove('active');
    resultsBtn.classList.add('active');
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
        const incWord = this.audioWords?.find((w) => w.translation === el);
        if (incWord) {
          const wordItem = parser.parseFromString(
            createWordItem(incWord.word, incWord.translation),
            'text/html',
          );
          const wordItemSound = wordItem.getElementById('word-sound') as HTMLElement;
          wordItemSound.onclick = () => {
            this.playAudio(`${this.baseUrl}${incWord.audio}`);
          };
          const child = wordItem.body.firstElementChild;
          if (child) {
            incorrectWordsContainer.appendChild(child);
          }
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
        const corWord = this.audioWords?.find((w) => w.translation === el);
        if (corWord) {
          const wordItem = parser.parseFromString(
            createWordItem(corWord.word, corWord.translation),
            'text/html',
          );
          const wordItemSound = wordItem.getElementById('word-sound') as HTMLElement;
          wordItemSound.onclick = () => {
            this.playAudio(`${this.baseUrl}${corWord.audio}`);
          };
          const child = wordItem.body.firstElementChild;
          if (child) {
            correctWordsContainer.appendChild(child);
          }
        }
      });
    }
  }

  async startPress() {
    const checkedInput = document.querySelector(
      'input[name="audio-level"]:checked',
    ) as HTMLInputElement;

    if (!checkedInput) {
      alert('Please select a level');
      return;
    }

    this.level = +checkedInput.value;
    this.pageStart = 1;
    this.audioWords = await this.getWords(this.level, this.pageStart);
    this.view.frontBlockWrapper.container.innerHTML = FRONT_BLOCK_CONTENT_GAME;
    this.startGame();
  }

  enterPress(e: Event) {
    if (!this.isGameStarted) {
      // in start menu
      this.startPress();
    } else {
      // in game
      const selectedOption = document.querySelector('.audio-word-btn.active') as HTMLInputElement;

      if (selectedOption && !this.isSkippedPressed) {
        // use selected option
        this.checkAnswer(e);
      } else {
        // skip
        this.skipQuestions(e);
      }
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
        (document.querySelector('input[type="radio"]:first-of-type') as HTMLInputElement).checked =
          true;
      }
    } else {
      // in game - controll game btns
      // if skip has been pressed don't allow keypresses
      if (this.isSkippedPressed) return;

      const selectedOption = document.querySelector('.audio-word-btn.active') as HTMLInputElement;
      if (selectedOption) {
        if (direction === 'right') {
          if (selectedOption.nextElementSibling) {
            selectedOption.classList.remove('active');
            (selectedOption.nextElementSibling as HTMLInputElement).classList.add('active');
          }
        } else if (selectedOption.previousElementSibling) {
          selectedOption.classList.remove('active');
          (selectedOption.previousElementSibling as HTMLInputElement).classList.add('active');
        }
      } else {
        (document.querySelector('.audio-word-btn') as HTMLInputElement).classList.add('active');
      }
    }
  }

  async startGame() {
    this.resetValues();
    this.isGameStarted = true;
    this.setWords();
  }

  setWords() {
    if (!this.audioWords || this.isGameStarted === false) return;

    // end game condition
    if (this.currentWordIndex >= this.audioWords.length) {
      this.endGame();
      return;
    }

    const question = this.audioWords[this.currentWordIndex];
    this.currentMatchIndex = question.matchIndex;

    // Set word audio
    (document.getElementById('audio-word-player') as HTMLElement).onclick = () => {
      this.playAudio(`${this.baseUrl}${question.audio}`);
    };
    // Remove image opacity
    (document.getElementById('img') as HTMLImageElement).style.opacity = '0';

    // Set all answer btns
    const btns = document.querySelectorAll('.audio-word-btn') as NodeList;
    btns.forEach((btn, i) => {
      const b = btn as HTMLInputElement;
      b.innerHTML = question.options[i];
      b.disabled = false;
      b.onclick = (e) => {
        this.checkAnswer(e);
      };
      if (b.classList.contains('correct') || b.classList.contains('incorrect')) {
        b.classList.value = 'audio-word-btn';
      }
    });

    // Set skip btn
    const skipBtn = document.getElementById('skip-btn') as HTMLInputElement;
    skipBtn.innerHTML = 'Skip';
    this.isSkippedPressed = false;
    skipBtn.onclick = this.skipQuestions.bind(this);
    this.playAudio(`${this.baseUrl}${question.audio}`);
  }

  calculateResult() {
    const allAnswers = this.correctWords.length + this.incorrectWords.length;
    let percent: number;
    if (allAnswers > 0) {
      percent = (this.correctWords.length * 100) / allAnswers;
    } else {
      percent = 0;
    }
    return Math.round(percent);
  }

  async endGame() {
    this.isGameStarted = false;
    this.view.frontBlockWrapper.container.innerHTML = FRONT_BLOCK_CONTENT_MODAL;
    const message = document.getElementById('result-message') as HTMLElement;
    // do calculations
    // filter incorrect arr for skip or next
    // dislay the words
    const correctWordsNoRepeat = Array.from(new Set(this.correctWords));
    const incorrectWordsNoRepeat = Array.from(new Set(this.incorrectWords));
    this.correctWords = correctWordsNoRepeat;
    this.incorrectWords = incorrectWordsNoRepeat;
    if (this.correctWords.length === 10) {
      message.innerHTML = 'Splendid work! Just keep going';
    } else if (this.correctWords.length === 0) {
      message.innerHTML = 'Sorry! But you can do much better';
    }
    const percent = this.calculateResult();
    (document.getElementById('percent-circle') as HTMLElement).style.strokeDashoffset = (
      4.4 *
      (100 - percent)
    ).toString();
    (document.getElementById('percentage-amount') as HTMLElement).innerHTML = percent.toString();
    (document.getElementById('correct-count') as HTMLElement).innerHTML =
      this.correctWords.length.toString();
    (document.getElementById('incorrect-count') as HTMLElement).innerHTML =
      this.incorrectWords.length.toString();
    await percentStats(percent, 'audio');
    this.setSeeWords();
  }

  skipQuestions(e: Event) {
    // use if for next btn
    if (this.isSkippedPressed) {
      this.currentWordIndex += 1;
      this.isSkippedPressed = false;
      this.setWords();
      return;
    }
    // use check answer for skip btn
    this.checkAnswer(e);
  }

  async playAudio(path: string) {
    this.audio.src = path;
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      await playPromise
        .then(() => {
          this.audio.pause();
          this.audio.currentTime = 0;
          this.audio.play();
        })
        .catch((e) => console.log("Don't click or press so fast, please"));
    } else {
      this.audio.play();
    }
  }

  async checkAnswer(e: Event) {
    if (!this.audioWords) return;
    const word = this.audioWords[this.currentMatchIndex];
    await addNewWordsStats(word.id, 'audio');
    const answers = Array.from(document.querySelectorAll('.audio-word-btn') as NodeList);
    answers.forEach((el) => {
      const btn = el as HTMLInputElement;
      btn.disabled = true;
    });

    const matchBtn = answers[this.currentMatchIndex] as HTMLInputElement;
    const skipBtn = document.getElementById('skip-btn') as HTMLInputElement;
    let target;
    const audioWordBtn = document.querySelector('.audio-word-btn.active') as HTMLInputElement;
    if (audioWordBtn) {
      target = audioWordBtn;
      target.classList.remove('active');
    } else {
      target = e.type === 'click' ? (e.target as HTMLInputElement) : skipBtn;
    }

    const answer = target.innerHTML;
    const img = document.getElementById('img') as HTMLImageElement;
    if (matchBtn.innerHTML === answer) {
      target.classList.add('correct');
      this.correctWords.push(answer);
      this.playAudio('../../../assets/correct-sound.mp3');
      this.updateLearnedWord(word.id, false);
      // await handleGamesAnswers(word.id, 'audio', 'right');
    } else {
      if (answer !== 'Skip') {
        await removeLearnedStats(word.id); // remove from learned if wrong
        target.classList.add('incorrect');
        this.incorrectWords.push(matchBtn.innerHTML);
        this.playAudio('../../../assets/incorrect-sound.mp3');
      } else if (answer === 'Skip') {
        this.incorrectWords.push(matchBtn.innerHTML);
        this.playAudio('../../../assets/incorrect-sound.mp3');
      }
      // set matchBtn to green and set target to red
      matchBtn.classList.add('correct');
      this.updateLearnedWord(word.id, true);
      // await handleGamesAnswers(word.id, 'audio', 'wrong');
    }
    if (this.audioWords) {
      img.src = `${this.baseUrl}${this.audioWords[this.currentWordIndex].image}`;
    }
    // display image using audioWords[currentIndex].image
    // set image to block
    // in setWords reset image to none
    this.isSkippedPressed = true;
    skipBtn.innerHTML = 'Next';
    setTimeout(() => {
      img.style.opacity = '1';
    }, 200);
  }

  async updateLearnedWord(wordId: string, remove: boolean) {
    if (this.userId) {
      if (remove) {
        removeLearnedWord(wordId);
      } else {
        createLearnedWord(wordId);
      }
    }
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
    const words1 = await getWordsTextbook(level, pageStart, this.model.isAuth);
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
        // eslint-disable-next-line no-underscore-dangle
        id: word._id,
        word: word.word,
        translation: word.wordTranslate,
      };
      arr.push(wordObj);
      usedWords = [];
    }
    // select 10 random words from arr
    return arr.sort(() => Math.random() - Math.random()).slice(0, 10);
  }
}

export default GameAudioController;
