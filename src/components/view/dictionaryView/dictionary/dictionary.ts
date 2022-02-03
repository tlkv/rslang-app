import IWord from '../../../interfaces/Iword';
import AbstractComponentView from '../../abstractViews/abstractComponentView';

class Dictionary extends AbstractComponentView {
  constructor() {
    super();
  }

  draw(container: HTMLElement) {
    const dictionaryContainer = document.createElement('div');
    dictionaryContainer.classList.add('dictionary-container');
    dictionaryContainer.innerHTML = `this is a dictionary part`;
    container.appendChild(dictionaryContainer);
  }
}

export default Dictionary;
