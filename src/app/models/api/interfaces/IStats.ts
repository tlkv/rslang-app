interface IStats {
  learnedWords?: number;
  id?: string;
  optional?: {
    wordList?: {
      // learned
      stat?: { wId: string; wDate: string }[];
    };
    newWords?: {
      // new
      stat?: { wId: string; wDate: string }[];
    };
  };
}

export default IStats;
