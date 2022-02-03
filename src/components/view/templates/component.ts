abstract class Component {
  protected container: HTMLElement;

  constructor(
    tag: keyof HTMLElementTagNameMap,
    classes?: string[],
    id?: string,
    parentNode?: HTMLElement,
  ) {
    this.container = document.createElement(tag);
    if (classes) {
      this.container.classList.add(...classes);
    }
    if (id) {
      this.container.id = id;
    }
    if (parentNode) {
      parentNode.append(this.container);
    }
  }

  getContainer() {
    return this.container;
  }

  destroyContainer(): void {
    this.container.remove();
  }
}

export default Component;
