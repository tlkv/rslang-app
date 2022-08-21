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

  public groupsAmount = 6;

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
    isAuth: boolean,
    textbookShowDifficult: boolean,
    textbookShowLearned: boolean,
  ) {
    const isAllLearned = words.every(
      (item) =>
        // eslint-disable-next-line operator-linebreak, implicit-arrow-linebreak
        item?.userWord?.optional?.isLearned === 'learned' ||
        item?.userWord?.difficulty === 'difficult',
    );
    const isPagination = !textbookShowDifficult && !textbookShowLearned;
    const buttons = this.renderButtons(
      textbookGroup,
      isAuth,
      textbookShowDifficult,
      textbookShowLearned,
      isAllLearned,
    );

    const pagination = TextbookView.renderPagination(textbookPage, textbookMaxPage, isAllLearned);

    const wordCards = TextbookView.renderWordCards(
      words,
      isAuth,
      textbookShowDifficult,
      textbookShowLearned,
    );
    let secTitile = `Textbook - Group ${textbookGroup + 1}`;
    if (isAuth && textbookShowDifficult) {
      secTitile = `Difficult - <span class="additional-counter">
      ${words.length}</span>`;
    } else if (isAuth && textbookShowLearned) {
      secTitile = `Learned - <span class="additional-counter">
      ${words.length}</span>`;
    }

    if (isAllLearned) {
      this.frontBlock.container.classList.add('all-learned');
    } else {
      this.frontBlock.container.classList.remove('all-learned');
    }

    if (isAuth && textbookShowDifficult) {
      this.frontBlock.container.classList.add('all-difficult');
    } else {
      this.frontBlock.container.classList.remove('all-difficult');
    }

    const searchField = `<input type="search"
    class="adv-search" autocomplete="off" placeholder="Search words" data-action="search">`;

    const elemContent = `
    <div class="textbook-categories-wrapper">
      ${buttons}
    </div>
    <h2 class="textbook-view-title">${secTitile}</h2>
    ${isPagination ? '' : searchField}
    <div class="textbook-pages-wrapper">
      ${isPagination ? pagination : ''}
    </div>
    <div class="textbook-words-wrapper">
      ${wordCards}
    </div>
    <div class="textbook-pages-wrapper">
    ${isPagination ? pagination : ''}
    </div>`;

    this.frontBlockWrapper.container.innerHTML = elemContent;
  }

  renderButtons(
    textbookGroup: number,
    isAuth: boolean,
    textbookShowDifficult: boolean,
    textbookShowLearned: boolean,
    isAllLearned: boolean,
  ) {
    const disableGamesCond = (isAllLearned || textbookShowLearned) && !textbookShowDifficult;
    let categButtons = '';
    for (let i = 0; i < this.groupsAmount; i += 1) {
      let buttonActive = '';
      let buttonData = `data-action="textbook-group" data-state="textbookGroup" data-value="${i}"`;
      if (textbookGroup === i && !textbookShowDifficult && !textbookShowLearned) {
        buttonActive = ' active';
        buttonData = '';
      }
      categButtons += `<button class="textbook-categories-button${buttonActive}"
      ${buttonData}>
      <div class="button-inner-left" ${buttonData}>Group</div>
      <div class="button-inner-right button-inner-color-${i + 1}"
      ${buttonData}>${i + 1}</div></button>`;
    }

    let additionalButtons = `
      <a href="#gamesprint" class="textbook-categories-button button-start-sprint-game
      ${disableGamesCond ? 'disabled-link' : ''}"
      data-action="start-sprint-game-textbook">Start Sprint Game</a>
      <a href="#gameaudio" class="textbook-categories-button button-start-audio-game 
      ${disableGamesCond ? 'disabled-link' : ''}"
      data-action="start-audio-game-textbook">Start Audio Game</a>`;

    if (isAuth) {
      additionalButtons += `<button class="textbook-categories-button button-diff-words
      ${textbookShowDifficult ? ' active' : ''}" data-action="textbook-show-difficult">
      Difficult Words</button>
      <button class="textbook-categories-button button-learned-words
      ${textbookShowLearned ? ' active' : ''} ${isAllLearned ? ' all-learned-button' : ''}"
      data-action="textbook-show-learned">
      Learned Words</button>`;
    }

    const buttonsContainer = `
    <div class="categories-buttons-container">
      ${categButtons}
    </div>
    <div class="additional-buttons-container">
      ${additionalButtons}
    </div>
    `;
    return buttonsContainer;
  }

  static renderPagination(textbookPage: number, textbookMaxPage: number, isAllLearned: boolean) {
    const first = 'data-action="textbook-pagination" data-state="textbookPage" data-value="0"';
    const prev = `data-action="textbook-pagination" data-state="textbookPage"
    data-value="${textbookPage - 1}"`;
    const next = `data-action="textbook-pagination" data-state="textbookPage" data-value="
    ${textbookPage + 1}"`;
    const last = `data-action="textbook-pagination" data-state="textbookPage" data-value="
    ${textbookMaxPage}"`;

    const pagination = `
    <button class="textbook-pages-button pagination-first"${textbookPage !== 0 ? first : ''}>
      <i class="fa-solid fa-angles-left"></i>
    </button>
    <button class="textbook-pages-button pagination-prev"
      ${textbookPage !== 0 ? prev : ''}><i class="fa-solid fa-angle-left"></i>
    </button>
    <button class="textbook-pages-button pagination-current
    ${isAllLearned ? ' pagination-learned-curr' : ''}">
      ${textbookPage + 1}/${textbookMaxPage + 1}
    </button>
    <button class="textbook-pages-button pagination-next"
      ${textbookPage !== textbookMaxPage ? next : ''}><i class="fa-solid fa-angle-right"></i>
    </button>
    <button class="textbook-pages-button pagination-last"
      ${textbookPage !== textbookMaxPage ? last : ''}> <i class="fa-solid fa-angles-right"></i>
    </button>`;

    return pagination;
  }

  static renderWordCards(
    words: IDictWord[],
    isAuth: boolean,
    textbookShowDifficult: boolean,
    textbookShowLearned: boolean,
  ) {
    const renderWordCard = (word: IDictWord) => {
      const isDifficult = isAuth && word?.userWord?.difficulty === 'difficult';
      const isLearned = isAuth && word?.userWord?.optional?.isLearned === 'learned';

      // eslint-disable-next-line no-underscore-dangle
      const wId = isAuth ? word._id : word.id;
      const addDifficult = `
      <button class="textbook-diff-button button-card-color-${word.group + 1}"
      data-add-difficult="${wId}"
      data-action="textbook-add-difficult">Add as difficult</button>`;

      const addLearned = `
      <button class="textbook-learned-button button-card-color-${word.group + 1}"
      data-add-learned="${wId}"
      data-action="textbook-add-learned">Add as learned</button>`;
      const removeDifficult = `
      <button class="textbook-diff-button button-card-color-${word.group + 1}"
      data-rem-difficult="${wId}"
      data-action="textbook-rem-difficult">Remove as difficult</button>`;
      const removeLearned = `
      <button class="textbook-learned-button button-card-color-${word.group + 1}"
      data-rem-learned="${wId}"
      data-action="textbook-rem-learned">Remove as learned</button>`;
      const authButtons = `
          ${isDifficult && !textbookShowLearned ? removeDifficult : ''}
          ${!isDifficult && !textbookShowLearned ? addDifficult : ''}
          ${isLearned && !textbookShowDifficult ? removeLearned : ''}
          ${!isLearned && !textbookShowDifficult ? addLearned : ''}`;
      const wordCard = `
      <div class="textbook-card-item item-shadow-${word.group + 1}
      ${isLearned ? 'textbook-card-learned' : ''}"
        data-id ="${wId}"
        data-group ="${word.group}"
        data-page ="${word.page}">
        <div class="textbook-card-img" style="background-image: url(${baseUrl}/${word.image}");>
        </div>
        <div class="textbook-card-content">
          <h2 class="textbook-card-word ${isDifficult ? 'textbook-card-difficult' : ''}">
          ${word.word}</h2>
          <h3 class="textbook-card-translate">${word.wordTranslate}</h3>
          <h4 class="textbook-card-transcription">${word.transcription}
            <button class="textbook-audio"
            data-action="textbook-audio" data-audio ="${baseUrl}/${word.audio}"
            data-audio-meaning ="${baseUrl}/${word.audioMeaning}" 
            data-audio-example ="${baseUrl}/${word.audioExample}">
            <i class="fas fa-volume-up color-group-${word.group + 1}"></i></button>
          </h4>
          ${isAuth ? authButtons : ''}
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
      return wordCard;
    };

    const wordCards = words.map((i) => renderWordCard(i)).join('');
    return wordCards;
  }
}

export default TextbookView;
