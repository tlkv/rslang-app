import './textbookView.scss';
import Component from '../_templates/component';
import Header from '../_templates/header/header';
import Footer from '../_templates/footer/footer';
import IDictWord from '../../models/api/interfaces/IDictWord';
import { baseUrl } from '../../models/api/api/getWordsTextbook';

class TextbookView extends Component {
  frontBlockWrapper = new Component('div', ['container']);

  header: Header;

  frontBlock: Component;

  footer: Footer;

  constructor(root: HTMLElement) {
    super('div', ['textbook-view'], root);

    this.header = new Header(this.container);
    this.frontBlock = new Component('div', ['textbook-block', 'app-center-block'], this.container);
    this.footer = new Footer(this.container);
    this.frontBlock.container.append(this.frontBlockWrapper.container);
  }

  renderTextbook(
    textbookGroup: number,
    textbookPage: number,
    textbookMaxPage: number,
    words: IDictWord[],
  ) {
    const buttons = TextbookView.renderButtons(textbookGroup);

    const pagination = TextbookView.renderPagination(textbookPage, textbookMaxPage);

    const wordCards = TextbookView.renderWordCards(words);

    const elemContent = `
    <h2 class="textbook-view-title">Textbook</h2>
    <div class="textbook-categories-wrapper">
      ${buttons}
    </div>
    <div class="textbook-pages-wrapper">
      ${pagination}
    </div>
    <div class="textbook-words-wrapper">
      ${wordCards}
    </div>`;

    this.frontBlockWrapper.container.innerHTML = elemContent;
  }

  static renderButtons(textbookGroup: number) {
    let buttons = '';
    for (let i = 0; i < 6; i += 1) {
      let buttonActive = ' active';
      let buttonData = '';
      if (textbookGroup !== i) {
        buttonActive = '';
        buttonData = `data-state="textbookGroup" data-value="${i}"`;
      }
      buttons += `<button class="textbook-categories-button${buttonActive}"
      ${buttonData}>
      <div class="button-inner-left">Group</div>
      <div class="button-inner-right button-inner-color-${i + 1}">${i + 1}</div></button>`;
    }
    return buttons;
  }

  static renderPagination(textbookPage: number, textbookMaxPage: number) {
    let first = '';
    let prev = '';
    let next = '';
    let last = '';

    if (textbookPage !== 0) {
      first = 'data-state="textbookPage" data-value="0"';
      prev = `data-state="textbookPage"data-value="${textbookPage - 1}"`;
    }
    if (textbookPage !== textbookMaxPage) {
      next = `data-state="textbookPage" data-value="${textbookPage + 1}"`;
      last = `data-state="textbookPage" data-value="${textbookMaxPage}"`;
    }

    const pagination = `
    <button class="textbook-pages-button pagination-first"${first}><i class="fa-solid fa-angles-left"></i></button>
    <button class="textbook-pages-button pagination-prev"
    ${prev}><i class="fa-solid fa-angle-left"></i></button>
    <button class="textbook-pages-button pagination-current">${textbookPage + 1}</button>
    <button class="textbook-pages-button pagination-next"
    ${next}><i class="fa-solid fa-angle-right"></i></button>
    <button class="textbook-pages-button pagination-last"${last}><i class="fa-solid fa-angles-right"></i></button>`;

    return pagination;
  }

  static renderWordCards(words: IDictWord[]) {
    function renderWordCard(word: IDictWord) {
      return `
      <div class="textbook-card-item item-shadow-${word.group + 1}"
        data-id ="${word.id}"
        data-group ="${word.group}"
        data-page ="${word.page}">
        <div class="textbook-card-img" style="background-image: url(${baseUrl}/${word.image}");>
        </div>
        <div class="textbook-card-content">
          <h2 class="textbook-card-word">${word.word}</h2>
          <h3 class="textbook-card-translate">${word.wordTranslate}</h3>
          <h4 class="textbook-card-transcription">${word.transcription}
            <span class="textbook-audio"
            data-audio ="${baseUrl}/${word.audio}"
            data-audio-meaning ="${baseUrl}/${word.audioMeaning}" 
            data-audio-example ="${baseUrl}/${word.audioExample}">
            <i class="fas fa-volume-up color-group-${word.group + 1}"></i></span>
          </h4>
          <h2 class="textbook-meaning-title">
          <i class="fa-solid fa-book color-group-${word.group + 1}"></i> Meaning</h2>
          <p class="textbook-meaning-content">${word.textMeaning}</p>
          <p class="textbook-meaning-content">${word.textMeaningTranslate}</p>
          <h2 class="textbook-example-title">
          <i class="fa-solid fa-comment color-group-${word.group + 1}"></i> Example</h2>
          <p class="textbook-example-content">${word.textExample}</p>
          <p class="textbook-example-content">${word.textExampleTranslate}</p>
        </div>
      </div>
      `;
    }
    const wordCards = words.map((i) => renderWordCard(i)).join('');
    return wordCards;
  }
}

export default TextbookView;
