import './testView.scss';
import Component from '../_templates/component';
import Header from '../_templates/header/header';
import Footer from '../_templates/footer/footer';
import IStats from '../../models/api/interfaces/IStats';

class TestView extends Component {
  /* frontBlockContent = `<button class="auth-state">
  Change Authorisation State True or False</button>`; */

  frontBlockContent = 'Test Page';

  frontBlockWrapper = new Component('div', ['container']);

  header: Header;

  frontBlock: Component;

  footer: Footer;

  constructor(root: HTMLElement) {
    super('div', ['test-view'], root);
    this.header = new Header(this.container);
    this.frontBlock = new Component('div', ['test-block', 'app-center-block'], this.container);
    this.footer = new Footer(this.container);
    this.frontBlock.container.append(this.frontBlockWrapper.container);
    this.frontBlockWrapper.container.innerHTML = this.frontBlockContent;
  }

  renderStats(stats: IStats, isAuth: boolean) {
    const uniqueKeys = Array.from(new Set(stats.optional?.wordList?.stat?.map((i) => i.wDate)));
    console.log(uniqueKeys);
    const graphData = uniqueKeys.map((elem) => ({
      dateGraph: elem,
      wordsAmount: stats.optional?.wordList?.stat?.filter((i) => i.wDate === elem).length,
    }));

    const todayDateKey = new Date().toLocaleDateString('ru-RU');
    const todayData = graphData.filter((i) => i.dateGraph === todayDateKey);

    let learnedToday = 0;

    if (todayData.length !== 0 && todayData[0].wordsAmount) {
      learnedToday = todayData[0].wordsAmount;
    }

    const elemContent = `${JSON.stringify(graphData)}
    <button class="reset-stats-button">Reset Stats</button>
    <h2>Learned Today ${learnedToday}</h2>`;
    this.frontBlockWrapper.container.innerHTML = elemContent;
  }
}

export default TestView;
