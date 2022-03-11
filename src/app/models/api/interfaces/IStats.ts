interface IStats {
  learnedWords?: number;
  id?: string;
  optional?: {
    wordListLearned?: {
      // learned
      stat?: { wId: string; wDate: string }[];
    };
    newWords?: {
      // new
      stat?: { wId: string; wDate: string }[];
    };
    newWordsSprint?: {
      stat?: { wId: string; wDate: string }[];
    };
    newWordsAudio?: {
      stat?: { wId: string; wDate: string }[];
    };
    percentAll?: {
      stat?: { perc: number; wDate: string }[];
    };
    percentSprint?: {
      stat?: { perc: number; wDate: string }[];
    };
    percentAudio?: {
      stat?: { perc: number; wDate: string }[];
    };
  };
}

export default IStats;
