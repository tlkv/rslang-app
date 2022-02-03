class State {
  currentPage: number;

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  constructor() {
    this.currentPage = 1;
  }
}

export default State;
