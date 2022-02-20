interface IStats {
  learnedWords?: number;
  id?: string;
  optional?: {
    wordList?: {
      stat?: { wId: string; wDate: string }[];
    };
  };
}

export default IStats;
