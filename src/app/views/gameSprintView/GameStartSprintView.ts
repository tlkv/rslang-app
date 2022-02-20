import './gameSprintView.scss';
import Component from '../_templates/component';
import Header from '../_templates/header/header';
import {
  FRONT_BLOCK_CONTENT_START,
  FRONT_BLOCK_CONTENT_GAME,
  FRONT_BLOCK_CONTENT_MODAL,
  KEYBOARD_INSTRUCTIONS,
} from './const';

class GameStartSprintView extends Component {
  frontBlockContent = FRONT_BLOCK_CONTENT_START;

  frontKeyboardContent = KEYBOARD_INSTRUCTIONS;

  frontBlockWrapper = new Component('div', ['container']);

  header: Header;

  frontBlock: Component;

  constructor(root: HTMLElement) {
    super('div', ['game-sprint-view'], root);
    this.header = new Header(this.container);
    this.frontBlock = new Component('div', ['game-sprint-block', 'app-center-block'], this.container);
    this.frontBlock.container.innerHTML = KEYBOARD_INSTRUCTIONS;
    this.frontBlock.container.append(this.frontBlockWrapper.container);
    this.frontBlockWrapper.container.innerHTML = this.frontBlockContent;
  }
}

export default GameStartSprintView;
