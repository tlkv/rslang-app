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
    const allTimeLEarned = stats.optional?.wordList?.stat?.length;
    const allTimeLNew = stats.optional?.newWords?.stat?.length;
    const uniqueKeysLearned = Array.from(
      new Set(stats.optional?.wordList?.stat?.map((i) => i.wDate)),
    );
    const uniqueKeysNewWords = Array.from(
      new Set(stats.optional?.newWords?.stat?.map((i) => i.wDate)),
    );
    console.log(uniqueKeysLearned); // unique keys by date

    // group object by unique date keys
    const graphDataLearned = uniqueKeysLearned.map((elem) => ({
      dateGraph: elem,
      wordsAmount: stats.optional?.wordList?.stat?.filter((i) => i.wDate === elem).length,
    }));

    const graphDataNew = uniqueKeysNewWords.map((elem) => ({
      dateGraph: elem,
      wordsAmount: stats.optional?.newWords?.stat?.filter((i) => i.wDate === elem).length,
    }));

    // filter data for current date
    const todayDateKey = new Date().toLocaleDateString('ru-RU');
    const todayDataLearned = graphDataLearned.filter((i) => i.dateGraph === todayDateKey);
    const todayDataNew = graphDataNew.filter((i) => i.dateGraph === todayDateKey);

    let learnedToday = 0;

    if (todayDataLearned.length !== 0 && todayDataLearned[0].wordsAmount) {
      learnedToday = todayDataLearned[0].wordsAmount;
      // always 1 elem since we filter by date which is unique
    }

    let newToday = 0;

    if (todayDataNew.length !== 0 && todayDataNew[0].wordsAmount) {
      newToday = todayDataNew[0].wordsAmount;
    }

    const elemContent = `
    <button class="reset-stats-button">Reset Stats</button>
    <h2>Learned Today ${learnedToday}</h2>
    <h2>All Learned - ${allTimeLEarned} - ${JSON.stringify(graphDataLearned)}</h2>
    <h2>New Today ${newToday}</h2>
    <h2>All New - ${allTimeLNew} - ${JSON.stringify(graphDataNew)}</h2>
    <h4>RAW Data for debug - ${JSON.stringify(stats)}</h4>`;

    this.frontBlockWrapper.container.innerHTML = elemContent;
  }
}

export default TestView;
