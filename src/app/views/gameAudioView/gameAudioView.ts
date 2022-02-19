import './gameAudioView.scss';
import Component from '../_templates/component';
import Header from '../_templates/header/header';
import { FRONT_BLOCK_CONTENT_START, FRONT_BLOCK_CONTENT_GAME, FRONT_BLOCK_CONTENT_MODAL } from './const';

class GameAudioView extends Component {
  frontBlockContent = FRONT_BLOCK_CONTENT_START;

  frontBlockWrapper = new Component('div', ['container']);

  header: Header;

  frontBlock: Component;

  constructor(root: HTMLElement) {
    super('div', ['game-audio-view'], root);
    this.header = new Header(this.container);
    this.frontBlock = new Component('div', ['game-audio-block', 'app-center-block'], this.container);
    this.frontBlock.container.append(this.frontBlockWrapper.container);
    this.frontBlockWrapper.container.innerHTML = this.frontBlockContent;
  }
}

export default GameAudioView;
