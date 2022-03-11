class Component {
  container: HTMLElement;

  constructor(
    tag: keyof HTMLElementTagNameMap,
    classes?: string[],
    parentNode?: HTMLElement,
    id?: string,
  ) {
    this.container = document.createElement(tag);
    if (classes) {
      this.container.classList.add(...classes);
    }
    if (parentNode) {
      parentNode.append(this.container);
    }
    if (id) {
      this.container.id = id;
    }
  }

  destroyContainer(): void {
    this.container.remove();
  }
}

export default Component;
