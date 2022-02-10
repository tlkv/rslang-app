import IDictWord from '../interfaces/IDictWord';

export class State {
  textbookGroup: number;

  textbookPage: number;

  textbookMaxPage: number;

  words: IDictWord[];

  constructor() {
    this.textbookPage = 0;
    this.textbookMaxPage = 29;
    this.textbookGroup = 0;
    this.words = [];
  }

  /* // optional methods - not required for All fields
  set setCurrentPage(page: number) {
    this.currentPage = page;
  }

  get getCurrentPage() {
    return this.currentPage;
  } */
}

export const state = new State();
