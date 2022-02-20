interface IGraphData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export default IGraphData;
