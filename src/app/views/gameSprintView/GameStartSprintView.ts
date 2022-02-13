import './gameSprintView.scss';
import Component from '../_templates/component';
import Header from '../_templates/header/header';
import Footer from '../_templates/footer/footer';
import { FRONT_BLOCK_CONTENT_START, FRONT_BLOCK_CONTENT_GAME, FRONT_BLOCK_CONTENT_MODAL } from './const';

class GameStartSprintView extends Component {
  frontBlockContent = FRONT_BLOCK_CONTENT_START;

  frontBlockWrapper = new Component('div', ['container']);

  header: Header;

  frontBlock: Component;

  footer: Footer;

  constructor(root: HTMLElement) {
    super('div', ['game-sprint-view'], root);
    this.header = new Header(this.container);
    this.frontBlock = new Component('div', ['game-sprint-block', 'app-center-block'], this.container);
    this.frontBlock.container.append(this.frontBlockWrapper.container);
    this.frontBlockWrapper.container.innerHTML = this.frontBlockContent;
    this.footer = new Footer(this.container);
  }

  // renderGameSettings(
  //   textbookGroup: number,
  //   words: IDictWord[],
  // ) {
  //   const buttons = TextbookView.renderButtons(textbookGroup);
  // }
}

export default GameStartSprintView;
