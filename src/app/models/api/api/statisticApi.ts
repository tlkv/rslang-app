export const statisticdataTest = {
  sprint: {
    NewWords: '43',
    CurrentAnswers: '32',
    AnswerChains: '23',
  },
  audio: {
    NewWords: '12',
    CurrentAnswers: '56',
    AnswerChains: '42',
  },
  general: {
    LernedWords: '354',
    NewWords: '578',
    CurrentAnswers: '23',
  },
  date1: {
    learned: 5,
    difficult: 5,
  },
  date2: {
    learned: 4,
    difficult: 3,
  },
  date3: {
    learned: 6,
    difficult: 7,
  },
};

export const learnedData = {
  labels: ['date1', 'date2', 'date3'],
  datasets: [
    {
      label: 'learned',
      data: [
        statisticdataTest.date1.learned,
        statisticdataTest.date3.learned,
        statisticdataTest.date2.learned,
      ],
    },
  ],
};
