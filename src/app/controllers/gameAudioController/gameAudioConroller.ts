import GameAudioView from '../../views/gameAudioView/gameAudioView';
import { State, state } from '../../models/api/state/state';
import getWordsTextbook from '../../models/api/api/getWordsTextbook';
import { FRONT_BLOCK_CONTENT_START, FRONT_BLOCK_CONTENT_GAME, FRONT_BLOCK_CONTENT_MODAL } from '../../views/gameAudioView/const';
import IAudioWord from '../../models/api/interfaces/IAudioWord';

class GameAudioController {
  view: GameAudioView;

  model: State;

  audioWords: IAudioWord[] | undefined;

  isGameStarted: boolean;

  isSkippedPressed: boolean;

  level: number;

  pageStart: number;

  constructor(root: HTMLElement) {
    this.view = new GameAudioView(root);
    this.model = state;
    this.isGameStarted = false;
    this.isSkippedPressed = false;
    this.level = 1;
    this.pageStart = 0;
    this.containerListener();
  }

  containerListener() {
    this.view.frontBlock.container.addEventListener('click', async (e) => {
      if (!this.isGameStarted) {
        const startBtn = (e.target as HTMLElement).closest('#start-audio-btn') as HTMLInputElement;
        const restartBtn = (e.target as HTMLElement).closest('#restart-audio-btn') as HTMLInputElement;
        if (startBtn) {
          const checkedInput = document.querySelector('input[name="audio-level"]:checked') as HTMLInputElement;
          if (!checkedInput.value) {
            alert('Please select a level');
            return;
          }
          this.level = +checkedInput.value;
          console.log(this.level);
          this.pageStart = 1;
          // this.audioWords = await this.getWords(this.level, this.pageStart);
          console.log(this.audioWords);
        }
      }
    });
  }
  // async getWords(level: number, pageStart: number) {}
}

export default GameAudioController;
