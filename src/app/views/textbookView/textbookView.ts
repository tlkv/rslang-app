/* eslint-disable @typescript-eslint/indent */
import './textbookView.scss';
import Component from '../_templates/component';
import Header from '../_templates/header/header';
import Footer from '../_templates/footer/footer';

class TextbookView extends Component {
  /* frontBlockContent = `Textbook
  Page`; */

  frontBlockWrapper = new Component('div', ['container']);

  header: Header;

  frontBlock: Component;

  footer: Footer;

  textbookCategory: number;

  textbookPage: number;

  textbookMaxPage: number;

  constructor(
    root: HTMLElement,
    textbookCategory: number,
    textbookPage: number,
    textbookMaxPage: number,
  ) {
    super('div', ['textbook-view'], root);

    this.header = new Header(this.container);
    this.frontBlock = new Component('div', ['textbook-block', 'app-center-block'], this.container);
    this.footer = new Footer(this.container);
    this.frontBlock.container.append(this.frontBlockWrapper.container);
    // this.frontBlockWrapper.container.innerHTML = this.frontBlockContent;

    this.textbookCategory = textbookCategory;
    this.textbookPage = textbookPage;
    this.textbookMaxPage = textbookMaxPage;

    this.renderTextbook();
  }

  renderTextbook() {
    console.log(this.textbookCategory, this.textbookPage);
    let first = '';
    let prev = '';
    let next = '';
    let last = '';
    let buttons = '';
    if (this.textbookPage !== 0) {
      first = 'data-state="textbookPage" data-value="0"';
      prev = `data-state="textbookPage"data-value="${this.textbookPage - 1}"`;
    }
    if (this.textbookPage !== this.textbookMaxPage) {
      next = `data-state="textbookPage" data-value="${this.textbookPage + 1}"`;
      last = `data-state="textbookPage" data-value="${this.textbookMaxPage}"`;
    }

    for (let i = 0; i < 6; i += 1) {
      buttons += `<button class="textbook-categories-button ${
        this.textbookCategory === i ? 'active' : ''
      }" data-state="textbookCategory" data-value="${i}">Category ${i + 1}</button>`;
    }

    const elemHeading = `
    <div class="textbook-categories-wrapper">
      ${buttons}
    </div>
    <div class="textbook-pages-wrapper">
      <button class="textbook-pages-button pagination-first"${first}>First</button>
      <button class="textbook-pages-button pagination-prev"
      ${prev}>Prev</button>
      <button class="textbook-pages-button pagination-current">${this.textbookPage + 1}</button>
      <button class="textbook-pages-button pagination-next"
      ${next}>Next</button>
      <button class="textbook-pages-button pagination-last"
      ${last}>Last</button>
    </div>`;
    this.frontBlockWrapper.container.innerHTML = elemHeading;

    console.log(
      'this.textbookCategory',
      this.textbookCategory,
      'this.textbookPage',
      this.textbookPage,
      'textbookMaxPage',
      this.textbookMaxPage,
    );
  }
}

export default TextbookView;
