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
    // date key for filtering data for last day
    const todayDateKey = new Date().toLocaleDateString('ru-RU');

    // learned words statss
    const allTimeLearned = stats.optional?.wordListLearned?.stat?.length;
    const uniqueKeysLearned = Array.from(
      new Set(stats.optional?.wordListLearned?.stat?.map((i) => i.wDate)),
    );
    // group object by unique date keys - this is main data source type
    const graphDataLearned = uniqueKeysLearned.map((elem) => ({
      dateGraph: elem,
      wordsAmount: stats.optional?.wordListLearned?.stat?.filter((i) => i.wDate === elem).length,
    }));
    const todayDataLearned = graphDataLearned.filter((i) => i.dateGraph === todayDateKey);
    let learnedToday = 0;
    if (todayDataLearned.length !== 0 && todayDataLearned[0].wordsAmount) {
      learnedToday = todayDataLearned[0].wordsAmount;
      // always 1 elem since it is filter by current date which is unique
    }

    // new words stats
    const allTimeNew = stats.optional?.newWords?.stat?.length;
    const uniqueKeysNewWords = Array.from(
      new Set(stats.optional?.newWords?.stat?.map((i) => i.wDate)),
    );
    const graphDataNew = uniqueKeysNewWords.map((elem) => ({
      dateGraph: elem,
      wordsAmount: stats.optional?.newWords?.stat?.filter((i) => i.wDate === elem).length,
    }));
    const todayDataNew = graphDataNew.filter((i) => i.dateGraph === todayDateKey);
    let newToday = 0;
    if (todayDataNew.length !== 0 && todayDataNew[0].wordsAmount) {
      newToday = todayDataNew[0].wordsAmount;
    }

    // sprint game stats
    const allTimeNewSprint = stats.optional?.newWordsSprint?.stat?.length;
    const uniqueKeysSprint = Array.from(
      new Set(stats.optional?.newWordsSprint?.stat?.map((i) => i.wDate)),
    );
    const graphDataNewSprint = uniqueKeysSprint.map((elem) => ({
      dateGraph: elem,
      wordsAmount: stats.optional?.newWordsSprint?.stat?.filter((i) => i.wDate === elem).length,
    }));
    const todayDataNewSprint = graphDataNewSprint.filter((i) => i.dateGraph === todayDateKey);
    let newSprintToday = 0;
    if (todayDataNewSprint.length !== 0 && todayDataNewSprint[0].wordsAmount) {
      newSprintToday = todayDataNewSprint[0].wordsAmount;
    }

    // audio game stats
    const allTimeNewAudio = stats.optional?.newWordsAudio?.stat?.length;
    const uniqueKeysAudio = Array.from(
      new Set(stats.optional?.newWordsAudio?.stat?.map((i) => i.wDate)),
    );
    const graphDataNewAudio = uniqueKeysAudio.map((elem) => ({
      dateGraph: elem,
      wordsAmount: stats.optional?.newWordsAudio?.stat?.filter((i) => i.wDate === elem).length,
    }));
    const todayDataNewAudio = graphDataNewAudio.filter((i) => i.dateGraph === todayDateKey);
    let newAudioToday = 0;
    if (todayDataNewAudio.length !== 0 && todayDataNewAudio[0].wordsAmount) {
      newAudioToday = todayDataNewAudio[0].wordsAmount;
    }

    // func for avg percent
    function percentAverage(statistics: { perc: number; wDate: string }[]) {
      const sumPerc = statistics?.map((i) => i.perc).reduce((acc, el) => acc + el, 0);
      const dividerPerc = statistics.length;
      return sumPerc && dividerPerc ? Math.round(sumPerc / dividerPerc) : 0;
    }

    // overall percent stats
    const allTimePercent = stats.optional?.percentAll?.stat
      ? percentAverage(stats.optional?.percentAll?.stat)
      : 0;
    const uniqueKeysPercentAll = Array.from(
      new Set(stats.optional?.wordListLearned?.stat?.map((i) => i.wDate)),
    );

    const graphDataPercentAll = uniqueKeysPercentAll.map((elem) => ({
      dateGraph: elem,
      percentAvg: stats.optional?.percentAll?.stat
        ? percentAverage(stats.optional?.percentAll?.stat.filter((i) => i.wDate === elem))
        : 0,
    }));
    const todayDataPercentAll = graphDataPercentAll.filter((i) => i.dateGraph === todayDateKey);
    let todayPercentAll = 0;
    if (todayDataPercentAll.length !== 0 && todayDataPercentAll[0].percentAvg) {
      todayPercentAll = todayDataPercentAll[0].percentAvg;
    }

    // sprint game percent stats
    const allTimePercentSprint = stats.optional?.percentSprint?.stat
      ? percentAverage(stats.optional?.percentSprint?.stat)
      : 0;
    const uniqueKeysPercentSprint = Array.from(
      new Set(stats.optional?.percentSprint?.stat?.map((i) => i.wDate)),
    );
    const graphDataPercentSprint = uniqueKeysPercentSprint.map((elem) => ({
      dateGraph: elem,
      percentAvg: stats.optional?.percentSprint?.stat
        ? percentAverage(stats.optional?.percentSprint?.stat.filter((i) => i.wDate === elem))
        : 0,
    }));
    const todayDataPercentSprint = graphDataPercentSprint.filter(
      (i) => i.dateGraph === todayDateKey,
    );
    let todayPercentSprint = 0;
    if (todayDataPercentSprint.length !== 0 && todayDataPercentSprint[0].percentAvg) {
      todayPercentSprint = todayDataPercentSprint[0].percentAvg;
    }

    // audio game percent stats
    const allTimePercentAudio = stats.optional?.percentAudio?.stat
      ? percentAverage(stats.optional?.percentAudio?.stat)
      : 0;
    const uniqueKeysPercentAudio = Array.from(
      new Set(stats.optional?.percentAudio?.stat?.map((i) => i.wDate)),
    );
    const graphDataPercentAudio = uniqueKeysPercentAudio.map((elem) => ({
      dateGraph: elem,
      percentAvg: stats.optional?.percentAudio?.stat
        ? percentAverage(stats.optional?.percentAudio?.stat.filter((i) => i.wDate === elem))
        : 0,
    }));
    const todayDataPercentAudio = graphDataPercentAudio.filter((i) => i.dateGraph === todayDateKey);
    let todayPercentAudio = 0;
    if (todayDataPercentAudio.length !== 0 && todayDataPercentAudio[0].percentAvg) {
      todayPercentAudio = todayDataPercentAudio[0].percentAvg;
    }

    // render containers
    let graphDataElem = '';
    graphDataLearned.forEach((elem) => {
      graphDataElem += `
      <div>
      Date - ${elem.dateGraph}  Amount  - ${elem.wordsAmount} 
      </div>`;
    });

    let graphDataNewElem = '';
    graphDataNew.forEach((elem) => {
      graphDataNewElem += `
      <div>
      Date - ${elem.dateGraph}  Amount  - ${elem.wordsAmount} 
      </div>`;
    });

    let graphDataSprintElem = '';
    graphDataNewSprint.forEach((elem) => {
      graphDataSprintElem += `
      <div>
      Date - ${elem.dateGraph}  Amount  - ${elem.wordsAmount} 
      </div>`;
    });

    const elemContent = `
    <button class="reset-stats-button">Reset Stats</button>
    <h2>Learned Today ${learnedToday}</h2>
    <h2>All Learned - ${allTimeLearned} - ${graphDataElem}</h2>
    <br>
    <h2>New Today ${newToday}</h2>
    <h2>All New - ${allTimeNew} - ${graphDataNewElem}</h2>
    <br>
    <h2>New Today Sprint - ${newSprintToday}</h2>
    <h2>All New Sprint - ${allTimeNewSprint} - ${graphDataSprintElem}</h2>
    <br>
    <h2>New Today Audio - ${newAudioToday}</h2>
    <h2>All New Audio- ${allTimeNewAudio} - ${JSON.stringify(graphDataNewAudio)}</h2>
    <br>
    <h2> Today Percent - ${todayPercentAll}</h2>
    <h2> All time percent AVG - ${allTimePercent} stats - 
    ${JSON.stringify(graphDataPercentAll)}</h2>
    <br>
    <h2> Today Sprint game percent - ${todayPercentSprint}</h2>
    <h2>All Sprint game percent AVG - ${allTimePercentSprint} stats - 
    ${JSON.stringify(graphDataPercentSprint)}</h2>
    <br>
    <h2> Today Audio game percent - ${todayPercentAudio}</h2>
    <h2>All Audio game percent percent AVG - 
    ${allTimePercentAudio} stats - ${JSON.stringify(graphDataPercentAudio)}</h2>
    <br>
    <h4>RAW Data for debug - ${JSON.stringify(stats)}</h4>`;

    this.frontBlockWrapper.container.innerHTML = elemContent;
  }
}

export default TestView;
