export class State {
  currentPage: number;

  constructor() {
    this.currentPage = 1;
  }

  // optional methods - not required for All fields
  set setCurrentPage(page: number) {
    this.currentPage = page;
  }

  get getCurrentPage() {
    return this.currentPage;
  }
}

export const state = new State();
