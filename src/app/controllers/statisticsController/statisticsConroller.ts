/* eslint-disable @typescript-eslint/ban-ts-comment */
import Chart from 'chart.js/auto';
import StatisticsView from '../../views/statisticsView/statisticsView';
import { State, state } from '../../models/api/state/state';
import {
  learnedData,
  progressData,
  chartOptions,
  sprintData,
  audioData,
  gameProgressData,
} from '../../models/api/state/state2';
import { getStatistics } from '../../models/api/api/getWordsTextbook';
import IStats from '../../models/api/interfaces/IStats';
import { IGraphData, IGameData, IGameProgressData } from '../../models/api/interfaces/IGraphData';

class StatisticsController {
  view: StatisticsView;

  model: State;

  drawBarGraphData: IGraphData;

  drawLineGraphData: IGraphData;

  gameProgressData: IGameProgressData;

  sprintData: IGameData;

  audioData: IGameData;

  constructor(root: HTMLElement) {
    this.view = new StatisticsView(root);
    this.model = state;
    this.drawBarGraphData = learnedData;
    this.drawLineGraphData = progressData;
    this.gameProgressData = gameProgressData;
    this.sprintData = sprintData;
    this.audioData = audioData;
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

    const scheduleChart = new Chart(canvas, {
      type: 'line',
      data: chartLinedata,
      options: chartOptions,
    });
  }

  createBarSchedule(chartBardata: IGraphData) {
    const canvas = this.view.frontBlock.container.querySelector(
      '.schedule-bar',
    ) as HTMLCanvasElement;

    const scheduleChart = new Chart(canvas, {
      type: 'bar',
      data: chartBardata,
      options: chartOptions,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createTwoBarsSchedul(gamesData: IGameProgressData) {
    const canvas = this.view.frontBlock.container.querySelector(
      '.games-schedule',
    ) as HTMLCanvasElement;
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

    // overall percent stats
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

    const allTimeNewSprint = stats.optional?.newWordsSprint?.stat?.length;
    const allTimeNewAudio = stats.optional?.newWordsAudio?.stat?.length;

    const labels = [' '] as string[];
    const data = [0] as number[];
    const dataLine = [0] as number[];

    graphDataNew.forEach((elem) => {
      labels.push(elem.dateGraph);
      data.push(elem.wordsAmount as number);
    });

    if (graphDataLearned.length > 1) {
      for (let i = 0; i < graphDataLearned.length; i += 1) {
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

    this.gameProgressData.labels = labels;
    this.sprintData.data = [0, allTimeNewSprint as number];
    this.audioData.data = [0, allTimeNewAudio as number];

    this.view.drawView(
      newSprintToday as number,
      todayPercentSprint as number,
      newAudioToday as number,
      todayPercentAudio as number,
      learnedToday as number,
      newToday as number,
      todayPercentAll as number,
    );

    /* this.createLineSchedule(this.drawLineGraphData as IGraphData);
    this.createBarSchedule(this.drawBarGraphData as IGraphData);
    this.createTwoBarsSchedul(this.gameProgressData as IGameProgressData); */
  }
}

export default StatisticsController;
