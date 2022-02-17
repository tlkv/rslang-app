import IDictWord from '../interfaces/IDictWord';
import IDictAuth from '../interfaces/IDictAuth';

export class State {
  textbookGroup: number;

  textbookPage: number;

  textbookMaxPage: number;

  textbookShowDifficult: boolean;

  textbookShowLearned: boolean;

  words: IDictWord[];

  authWords: IDictAuth;

  isAuth = true;

  constructor() {
    this.textbookGroup = 0;
    this.textbookPage = 0;
    this.textbookMaxPage = 29;
    this.textbookShowDifficult = false;
    this.textbookShowLearned = false;
    this.words = [];
    this.authWords = {
      paginatedResults: [],
      totalCount: [],
    };
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
