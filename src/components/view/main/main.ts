import './main.scss';
import Component from '../templates/component';

class Main extends Component {
  constructor() {
    super('main', ['main-cl'], 'main', document.body); // tag, class, id
  }
}

export default Main;
