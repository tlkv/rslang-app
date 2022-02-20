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
    this.view.drawView(
      statisticdataTest.sprint.NewWords as string,
      statisticdataTest.sprint.CurrentAnswers as string,
      statisticdataTest.sprint.AnswerChains as string,
      statisticdataTest.audio.NewWords as string,
      statisticdataTest.audio.CurrentAnswers as string,
      statisticdataTest.audio.AnswerChains as string,
      statisticdataTest.general.LernedWords as string,
      statisticdataTest.general.NewWords as string,
      statisticdataTest.general.CurrentAnswers as string,
    );
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
    const uniqueKeys = Array.from(new Set(stats.optional?.wordList?.stat?.map((i) => i.wDate)));
    const graphData = uniqueKeys.map((elem) => ({
      dateGraph: elem,
      wordsAmount: stats.optional?.wordList?.stat?.filter((i) => i.wDate === elem).length,
    }));
    const labels = [' '] as string[];
    const data = [0] as number[];
    const dataLine = [] as number[];

    graphData.forEach((elem) => {
      labels.push(elem.dateGraph);
      data.push(elem.wordsAmount as number);
    });

    if (graphData.length > 1) {
      for (let i = 0; i < graphData.length; i++) {
        const amount = graphData[i].wordsAmount as number;
        if (i - 1 >= 0) {
          const prevAmount = dataLine[i - 1] as number;
          dataLine.push(amount + prevAmount);
        } else {
          dataLine.push(amount);
        }
      }
    } else {
      const amount = graphData[0].wordsAmount as number;
      dataLine.push(amount);
    }
    this.drawLineGraphData.labels = labels;
    this.drawLineGraphData.datasets[0].data = dataLine;

    this.drawBarGraphData.labels = labels;
    this.drawBarGraphData.datasets[0].data = data;

    this.chooseStatistic(this.drawLineGraphData as IGraphData, this.drawBarGraphData as IGraphData);
  }
}

export default StatisticsController;
