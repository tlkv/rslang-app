abstract class AbstractHeaderView {
  headerContainer: HTMLElement;

  constructor() {
    this.headerContainer = document.createElement('header') as HTMLElement;
  }

  abstract draw(): void;
}

export default AbstractHeaderView;
