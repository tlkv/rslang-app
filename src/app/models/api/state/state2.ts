import {
  IGraphData,
  IGameData,
  IGameProgressData,
  IChartGameOptions,
} from '../interfaces/IGraphData';

export const learnedData: IGraphData = {
  labels: [],
  datasets: [
    {
      label: 'learned',
      data: [],
    },
  ],
};

export const progressData: IGraphData = {
  labels: [],
  datasets: [
    {
      label: 'progress',
      data: [],
    },
  ],
};

export const chartOptions = {
  legend: {
    display: true,
    position: 'top',
    labels: {
      boxWidth: 80,
      fontColor: 'black',
    },
  },
  backgroundColor: 'rgba(54, 162, 235, 0.6)',
  borderColor: 'rgba(54, 162, 235, 0.6)',
  lineTension: 0.3,
};

export const chartGameOptions: IChartGameOptions = {
  scales: {
    xAxes: [
      {
        barPercentage: 1,
        categoryPercentage: 0.6,
      },
    ],
    yAxes: [
      {
        id: 'y-axis-sprint',
      },
      {
        id: 'y-axis-audio',
      },
    ],
  },
};

export const sprintData: IGameData = {
  label: 'Sprint game words',
  data: [],
  backgroundColor: 'rgba(240, 99, 132, 0.6)',
  borderColor: 'rgba(240, 99, 132, 1)',
  yAxisID: 'y-axis-sprint',
};

export const audioData: IGameData = {
  label: 'Audio game words',
  data: [],
  backgroundColor: 'rgba(54, 162, 235, 0.6)',
  borderColor: 'rgba(54, 162, 235, 1)',
  yAxisID: 'y-axis-audio',
};

export const gameProgressData: IGameProgressData = {
  labels: [],
  datasets: [sprintData, audioData],
};
