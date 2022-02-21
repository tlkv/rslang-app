import Chart from 'chart.js/auto';
import StatisticsView from '../../views/statisticsView/statisticsView';
import { State, state } from '../../models/api/state/state';
import { statisticdataTest, learnedData, progressData } from '../../models/api/api/statisticApi';
import chartOptions from '../../models/api/state/state2';
import { getStatistics } from '../../models/api/api/getWordsTextbook';
import IStats from '../../models/api/interfaces/IStats';
import IGraphData from '../../models/api/interfaces/IGraphData';

class StatisticsController {
  view: StatisticsView;

  model: State;

  drawBarGraphData: IGraphData;

  drawLineGraphData: IGraphData;

  constructor(root: HTMLElement) {
    this.view = new StatisticsView(root);
    this.model = state;
    this.drawBarGraphData = learnedData;
    this.drawLineGraphData = progressData;
    this.handleStatsUpdate();
  }

  chooseStatistic(chartLinedata: IGraphData, chartBardata: IGraphData) {
    this.createLineSchedule(chartLinedata);
    this.view.frontBlock.container.addEventListener('change', (event) => {
      const currTarget = event.target as HTMLInputElement;
      const currAction = currTarget.getAttribute('data-action');

      if (!currAction) return;

      switch (currAction) {
        case 'switch-off':
          this.createBarSchedule(chartBardata);
          break;
        case 'switch-on':
          this.createLineSchedule(chartLinedata);
          break;
        default:
          this.createLineSchedule(chartLinedata);
      }
    });
  }

  createLineSchedule(chartLinedata: IGraphData) {
    const canvas = this.view.frontBlock.container.querySelector(
      '.schedule-line',
    ) as HTMLCanvasElement;

    canvas.classList.remove('schedule-hide');

    const canvasBar = this.view.frontBlock.container.querySelector(
      '.schedule-bar',
    ) as HTMLCanvasElement;

    canvasBar.classList.add('schedule-hide');

    const scheduleChart = new Chart(canvas, {
      type: 'line',
      data: chartLinedata,
      options: chartOptions,
    });
  }

  createBarSchedule(chartBardata: IGraphData) {
    const canvasLine = this.view.frontBlock.container.querySelector(
      '.schedule-line',
    ) as HTMLCanvasElement;

    canvasLine.classList.add('schedule-hide');

    const canvas = this.view.frontBlock.container.querySelector(
      '.schedule-bar',
    ) as HTMLCanvasElement;

    canvas.classList.remove('schedule-hide');

    const scheduleChart = new Chart(canvas, {
      type: 'bar',
      data: chartBardata,
      options: chartOptions,
    });
  }

  async handleStatsUpdate() {
    if (this.model.isAuth) {
      this.model.stats = await getStatistics();
    }
    this.renderStats(this.model.stats);
  }

  renderStats(stats: IStats) {
    const uniqueKeysLearned = Array.from(
      new Set(stats.optional?.wordListLearned?.stat?.map((i) => i.wDate)),
    );
    const uniqueKeysNewWords = Array.from(
      new Set(stats.optional?.newWords?.stat?.map((i) => i.wDate)),
    );

    const graphDataLearned = uniqueKeysLearned.map((elem) => ({
      dateGraph: elem,
      wordsAmount: stats.optional?.wordListLearned?.stat?.filter((i) => i.wDate === elem).length,
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
    }

    let newToday = 0;

    if (todayDataNew.length !== 0 && todayDataNew[0].wordsAmount) {
      newToday = todayDataNew[0].wordsAmount;
    }
    function percentAverage(statistics: { perc: number; wDate: string }[]) {
      const sumPerc = statistics?.map((i) => i.perc).reduce((acc, el) => acc + el, 0);
      const dividerPerc = statistics.length;
      return sumPerc && dividerPerc ? Math.round(sumPerc / dividerPerc) : 0;
    }

    // const allTimeNewSprint = stats.optional?.newWordsSprint?.stat?.length;
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

    const labels = [' '] as string[];
    const data = [0] as number[];
    const dataLine = [0] as number[];

    graphDataNew.forEach((elem) => {
      labels.push(elem.dateGraph);
      data.push(elem.wordsAmount as number);
    });

    if (graphDataLearned.length > 1) {
      for (let i = 0; i < graphDataLearned.length; i++) {
        const amount = graphDataLearned[i].wordsAmount as number;
        if (i - 1 >= 0) {
          const prevAmount = dataLine[i - 1] as number;
          dataLine.push(amount + prevAmount);
        } else {
          dataLine.push(amount);
        }
      }
    } else {
      let amount = 0;
      if (graphDataLearned[0]) {
        amount = graphDataLearned[0].wordsAmount as number;
      }
      dataLine.push(amount);
    }

    this.drawLineGraphData.labels = labels;
    this.drawLineGraphData.datasets[0].data = dataLine;

    this.drawBarGraphData.labels = labels;
    this.drawBarGraphData.datasets[0].data = data;

    this.view.drawView(
      newSprintToday as number,
      todayPercentSprint as number,
      statisticdataTest.audio.NewWords as string,
      statisticdataTest.audio.CurrentAnswers as string,
      learnedToday as number,
      newToday as number,
      todayPercentAll as number,
    );
    this.chooseStatistic(this.drawLineGraphData as IGraphData, this.drawBarGraphData as IGraphData);
  }
}

export default StatisticsController;
