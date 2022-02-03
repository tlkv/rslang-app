abstract class AbstractMainView {
  mainContainer: HTMLTemplateElement;

  constructor() {
    this.mainContainer = document.createElement('main') as HTMLTemplateElement;
    document.body.appendChild(this.mainContainer);
  }
  abstract draw(): void;
}

export default AbstractMainView;
