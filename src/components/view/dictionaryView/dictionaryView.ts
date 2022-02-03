import HeaderView from '../mainView/header/header';
import MainPart from '../mainView/main/main';
import Dictionary from '../dictionaryView/dictionary/dictionary';
import Words from '../dictionaryView/words/words';
import FooterView from '../mainView/footer/footer';
import Controller from '../../controller/controller';
import AbstractMainView from '../abstractViews/abstractMainView';
import AbstractPageView from '../abstractViews/abstractPageView';

class DictionaryView extends AbstractPageView {
  header: HeaderView;
  dictionary: Dictionary;
  words: Words;
  main: MainPart;
  footer: FooterView;

  constructor(controller: Controller) {
    super();
    this.header = new HeaderView();
    this.dictionary = new Dictionary();
    this.words = new Words();
    this.main = new MainPart();
    this.footer = new FooterView();
  }

  draw() {
    document.body.innerHTML = '';
    this.header.draw();
    document.body.appendChild(this.mainContainer);
    this.dictionary.draw(this.mainContainer);
    this.words.draw(this.mainContainer);
    this.footer.draw();
  }
}

export default DictionaryView;
