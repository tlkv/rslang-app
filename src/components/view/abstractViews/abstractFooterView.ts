abstract class AbstractFooterView {
  footerContainer: HTMLElement;

  constructor() {
    this.footerContainer = document.createElement('footer') as HTMLElement;
    document.body.appendChild(this.footerContainer);
  }

  abstract draw(): void;
}

export default AbstractFooterView;
