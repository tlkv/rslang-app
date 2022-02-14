import IDictWord from '../interfaces/IDictWord';

export class State {
  textbookGroup: number;

  textbookPage: number;

  textbookMaxPage: number;

  textbookShowDifficult: boolean;

  textbookShowLearned: boolean;

  words: IDictWord[];

  isAuth = true;

  constructor() {
    this.textbookGroup = 0;
    this.textbookPage = 0;
    this.textbookMaxPage = 29;
    this.textbookShowDifficult = false;
    this.textbookShowLearned = false;
    this.words = [];
    // get all the words from the server
    // create an object for each
    /*
    [{
      eng: 'word',
      ru: 'translation',
      match: true,
    }]
    */
    // create two variables: correctMatches = 0 & incorrectMatches = 0;
    // create a variable to track the current index of a word
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
