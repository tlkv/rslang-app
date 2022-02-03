abstract class AbstractPageView {
  mainContainer: HTMLTemplateElement;

  constructor() {
    this.mainContainer = document.createElement('main') as HTMLTemplateElement;
    document.body.appendChild(this.mainContainer);
  }
  abstract draw(): void;
}

export default AbstractPageView;
