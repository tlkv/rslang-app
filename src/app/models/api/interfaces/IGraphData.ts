export interface IGraphData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export interface IGameData {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  yAxisID: string;
}

export interface IGameProgressData {
  labels: string[];
  datasets: IGameData[];
}

export interface IChartGameOptions {
  scales: {
    xAxes: {
      barPercentage: number;
      categoryPercentage: number;
    }[];
    yAxes: [
      {
        id: string;
      },
      {
        id: string;
      },
    ];
  };
}
