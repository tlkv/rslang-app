import GameAudioView from '../../views/gameAudioView/gameAudioView';
import { State, state } from '../../models/api/state/state';

class GameAudioController {
  view: GameAudioView;

  model: State;

  constructor(root: HTMLElement) {
    this.view = new GameAudioView(root);
    this.model = state;
  }
}

export default GameAudioController;
