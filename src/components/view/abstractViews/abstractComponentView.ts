import IWord from '../../interfaces/Iword';

abstract class AbstractComponentView {
  constructor() {}
  abstract draw(container: HTMLTemplateElement, data: IWord): void;
}

export default AbstractComponentView;
