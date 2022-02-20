import IDictWord from '../interfaces/IDictWord';
import IDictAuth from '../interfaces/IDictAuth';
import IStats from '../interfaces/IStats';

export class State {
  textbookGroup: number;

  textbookPage: number;

  textbookMaxPage: number;

  textbookShowDifficult: boolean;

  textbookShowLearned: boolean;

  words: IDictWord[];

  authWords: IDictAuth;

  isAuth = true;

  stats: IStats;

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
    this.stats = {
      learnedWords: 0,
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
