import Chart from 'chart.js/auto';
import StatisticsView from '../../views/statisticsView/statisticsView';
import { State, state } from '../../models/api/state/state';
import { statisticdataTest, learnedData } from '../../models/api/api/statisticApi';
import chartOptions from '../../models/api/state/state2';

class StatisticsController {
  view: StatisticsView;

  model: State;

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
    this.chooseStatistic();
  }

  chooseStatistic() {
    this.createLineSchedule();
    this.view.frontBlock.container.addEventListener('change', (event) => {
      const currTarget = event.target as HTMLInputElement;
      const currAction = currTarget.getAttribute('data-action');

      if (!currAction) return;

      switch (currAction) {
        case 'switch-off':
          this.createBarSchedule();
          break;
        case 'switch-on':
          this.createLineSchedule();
          break;
        default:
          this.createLineSchedule();
      }
    });
  }

  createLineSchedule() {
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
      data: learnedData,
      options: chartOptions,
    });
  }

  createBarSchedule() {
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
      data: learnedData,
      options: chartOptions,
    });
  }
}

export default StatisticsController;
