import IWord from '../../../interfaces/Iword';
import AbstractComponentView from '../../abstractViews/abstractComponentView';

class Words extends AbstractComponentView {
  constructor() {
    super();
  }
  draw(container: HTMLElement) {
    const wordsContainer = document.createElement('div');
    wordsContainer.classList.add('words-container');
    wordsContainer.innerHTML = `these are words`;
    container.appendChild(wordsContainer);
  }
}

export default Words;
