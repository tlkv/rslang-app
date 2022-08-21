/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import IDictWord from '../interfaces/IDictWord';
import IDictAuth from '../interfaces/IDictAuth';
import { IWordOpt } from '../interfaces/IWordOpt';
import IStats from '../interfaces/IStats';

export const baseUrl = 'https://rslang29.herokuapp.com';

const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');

const ARGS_DEF = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
  },
};

const ARGS_AUTH = {
  method: 'GET',
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  },
};

const OBJ_HEADERS = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const getWordsTextbook = async (group: number, page: number, isAuth: boolean) => {
  let url = `${baseUrl}/words?group=${group}&page=${page}`;
  if (isAuth) {
    url = `${baseUrl}/users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=20`;
  }
  const args = isAuth ? ARGS_AUTH : ARGS_DEF;
  const rawResponse = await fetch(url, args);
  let content: IDictWord[] = [];
  if (isAuth && rawResponse.status === 200) {
    const contentAuth: IDictAuth[] = await rawResponse.json();
    content = contentAuth[0].paginatedResults;
  } else if (!isAuth && rawResponse.status === 200) {
    content = await rawResponse.json();
  }
  return content;
};

export const resetStatistics = async () => {
  const userIdLoc = localStorage.getItem('userId');
  const tokenLoc = localStorage.getItem('token');
  const OBJ_HEADERS_RESET = {
    Authorization: `Bearer ${tokenLoc}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const url = `${baseUrl}/users/${userIdLoc}/statistics`;
  const defContent: IStats = {
    learnedWords: 0,
    optional: {
      wordListLearned: {
        stat: [],
      },
      newWords: {
        stat: [],
      },
      newWordsSprint: {
        stat: [],
      },
      newWordsAudio: {
        stat: [],
      },
      percentAll: {
        stat: [],
      },
      percentSprint: {
        stat: [],
      },
      percentAudio: {
        stat: [],
      },
    },
  };
  const requestParams = {
    method: 'PUT',
    withCredentials: true,
    headers: OBJ_HEADERS_RESET,
    body: JSON.stringify(defContent),
  };
  const resp = await fetch(url, requestParams);
};

export const getStatistics = async () => {
  const url = `${baseUrl}/users/${userId}/statistics`;
  const rawResponse = await fetch(url, ARGS_AUTH);
  let content: IStats = {};
  if (rawResponse.status === 200) {
    content = await rawResponse.json();
  }
  return content;
};

export const addLearnedStats = async (wordId: string) => {
  const url = `${baseUrl}/users/${userId}/statistics`;
  if (!userId || !token) return;
  let learnedBefore = false;

  const currentStats = await getStatistics();
  delete currentStats.id;
  if (currentStats.optional?.wordListLearned?.stat?.find((item) => item.wId === wordId)) {
    learnedBefore = true;
  }
  if (!learnedBefore) {
    if (currentStats?.learnedWords) {
      currentStats.learnedWords += 1;
    }
    currentStats?.optional?.wordListLearned?.stat?.push({
      wId: wordId,
      wDate: new Date().toLocaleDateString('ru-RU'),
    });
  }

  const response = currentStats;

  const respBody = JSON.stringify(response);
  const requestParams = {
    method: 'PUT',
    withCredentials: true,
    headers: OBJ_HEADERS,
    body: respBody,
  };

  const rawResponse = await fetch(url, requestParams);
  if (rawResponse.status === 200) {
    const content = await rawResponse.json();
  }
};

export const removeLearnedStats = async (wordId: string) => {
  const url = `${baseUrl}/users/${userId}/statistics`;
  if (!userId || !token) return;
  let learnedBefore = false;
  const currentStats = await getStatistics();
  delete currentStats.id;
  if (currentStats.optional?.wordListLearned?.stat?.find((item) => item.wId === wordId)) {
    learnedBefore = true;
  }

  if (learnedBefore) {
    if (currentStats?.learnedWords) {
      currentStats.learnedWords -= 1;
    }

    // eslint-disable-next-line operator-linebreak
    currentStats.optional!.wordListLearned!.stat =
      currentStats?.optional?.wordListLearned?.stat?.filter((i) => i.wId !== wordId);

    const respBody = JSON.stringify(currentStats);
    const requestParams = {
      method: 'PUT',
      withCredentials: true,
      headers: OBJ_HEADERS,
      body: respBody,
    };

    const rawResponse = await fetch(url, requestParams);
    if (rawResponse.status === 200) {
      const content = await rawResponse.json();
    }
  }
};

export const removeLearnedWord = async (wordId: string) => {
  const url = `${baseUrl}/users/${userId}/words/${wordId}`;
  if (!userId || !token) return;
  const contentGetResp: IWordOpt = {
    optional: {
      isLearned: 'no',
    },
  };
  const getResponse = await fetch(url, ARGS_AUTH);
  if (getResponse.status === 200) {
    const contentCurrentResp: IWordOpt = await getResponse.json();
    if (contentCurrentResp.optional && contentGetResp.optional) {
      Object.assign(contentGetResp.optional, contentCurrentResp.optional, {
        isLearned: 'no',
      });
    }
  }
  const respBody = JSON.stringify(contentGetResp);
  const requestParams = {
    method: 'PUT',
    withCredentials: true,
    headers: OBJ_HEADERS,
    body: respBody,
  };

  const rawResponse = await fetch(url, requestParams);
  if (rawResponse.status === 200) {
    const content = await rawResponse.json();
  }
  await removeLearnedStats(wordId);
};

export const createDifficultWord = async (wordId: string) => {
  const url = `${baseUrl}/users/${userId}/words/${wordId}`;
  if (!userId || !token) return;
  let isUserWord = false;
  const contentGetResp: IWordOpt = {
    difficulty: 'difficult',
    optional: {
      isLearned: 'no',
    },
  };
  const getResponse = await fetch(url, ARGS_AUTH);
  if (getResponse.status === 200) {
    const contentCurrentResp: IWordOpt = await getResponse.json();
    isUserWord = true;
    if (contentCurrentResp.optional && contentGetResp.optional) {
      Object.assign(contentGetResp.optional, contentCurrentResp.optional, {
        isLearned: 'no',
      });
    }
  }

  const respBody = JSON.stringify(contentGetResp);
  const currentMethod = isUserWord ? 'PUT' : 'POST';
  const requestParams = {
    method: currentMethod,
    withCredentials: true,
    headers: OBJ_HEADERS,
    body: respBody,
  };

  const rawResponse = await fetch(url, requestParams);
  if (rawResponse.status === 200) {
    const content = await rawResponse.json();
  }
  await removeLearnedWord(wordId); // test
};

export const addNewWordsStats = async (wordId: string, gametype: string) => {
  const url = `${baseUrl}/users/${userId}/statistics`;
  if (!userId || !token) return;
  let wasNewBefore = false;
  const currentStats = await getStatistics();
  delete currentStats.id;
  if (currentStats.optional?.newWords?.stat?.find((item) => item.wId === wordId)) {
    wasNewBefore = true;
  }
  if (!wasNewBefore) {
    currentStats.optional?.newWords?.stat?.push({
      wId: wordId,
      wDate: new Date().toLocaleDateString('ru-RU'),
    });
    if (gametype === 'sprint') {
      currentStats.optional?.newWordsSprint?.stat?.push({
        wId: wordId,
        wDate: new Date().toLocaleDateString('ru-RU'),
      });
    } else if (gametype === 'audio') {
      currentStats.optional?.newWordsAudio?.stat?.push({
        wId: wordId,
        wDate: new Date().toLocaleDateString('ru-RU'),
      });
    }
  }

  const response = currentStats;
  const respBody = JSON.stringify(response);
  const requestParams = {
    method: 'PUT',
    withCredentials: true,
    headers: OBJ_HEADERS,
    body: respBody,
  };

  const rawResponse = await fetch(url, requestParams);
  if (rawResponse.status === 200) {
    const content = await rawResponse.json();
  }
};

export const percentStats = async (percent: number, gametype: string) => {
  const url = `${baseUrl}/users/${userId}/statistics`;
  if (!userId || !token) return;
  const currentStats = await getStatistics();
  delete currentStats.id;

  currentStats.optional?.percentAll?.stat?.push({
    perc: percent,
    wDate: new Date().toLocaleDateString('ru-RU'),
  });
  if (gametype === 'sprint') {
    currentStats.optional?.percentSprint?.stat?.push({
      perc: percent,
      wDate: new Date().toLocaleDateString('ru-RU'),
    });
  } else if (gametype === 'audio') {
    currentStats.optional?.percentAudio?.stat?.push({
      perc: percent,
      wDate: new Date().toLocaleDateString('ru-RU'),
    });
  }

  const response = currentStats;
  const respBody = JSON.stringify(response);
  const requestParams = {
    method: 'PUT',
    withCredentials: true,
    headers: OBJ_HEADERS,
    body: respBody,
  };

  const rawResponse = await fetch(url, requestParams);
  if (rawResponse.status === 200) {
    const content = await rawResponse.json();
  }
};

export const createLearnedWord = async (wordId: string) => {
  const url = `${baseUrl}/users/${userId}/words/${wordId}`;
  if (!userId || !token) return;
  let isUserWord = false;
  const contentGetResp: IWordOpt = {
    difficulty: 'easy',
    optional: {
      isLearned: 'learned',
    },
  };
  const getResponse = await fetch(url, ARGS_AUTH);
  if (getResponse.status === 200) {
    const contentCurrentResp: IWordOpt = await getResponse.json();
    isUserWord = true;
    if (contentCurrentResp.optional && contentGetResp.optional) {
      Object.assign(contentGetResp.optional, contentCurrentResp.optional, {
        isLearned: 'learned',
      });
    }
  }
  const respBody = JSON.stringify(contentGetResp);
  const currentMethod = isUserWord ? 'PUT' : 'POST';
  const requestParams = {
    method: currentMethod,
    withCredentials: true,
    headers: OBJ_HEADERS,
    body: respBody,
  };

  const rawResponse = await fetch(url, requestParams);
  if (rawResponse.status === 200) {
    const content = await rawResponse.json();
  }
  await addLearnedStats(wordId);
};

export const removeDifficultWord = async (wordId: string) => {
  const url = `${baseUrl}/users/${userId}/words/${wordId}`;
  if (!userId || !token) return;

  const requestParams = {
    method: 'PUT',
    withCredentials: true,
    headers: OBJ_HEADERS,
    body: JSON.stringify({
      difficulty: 'easy',
    }),
  };

  const rawResponse = await fetch(url, requestParams);
  if (rawResponse.status === 200) {
    const content = await rawResponse.json();
  }
};

export const filterDifficultWords = async () => {
  const url = `${baseUrl}/users/${userId}/aggregatedWords?wordsPerPage=3600&filter={"userWord.difficulty":"difficult"}`;
  const rawResponse = await fetch(url, ARGS_AUTH);
  let contentAuth: IDictAuth[] = [];
  if (rawResponse.status === 200) {
    contentAuth = await rawResponse.json();
  }
  const content = contentAuth[0].paginatedResults;
  return content;
};

export const filterLearnedWords = async () => {
  const url = `${baseUrl}/users/${userId}/aggregatedWords?wordsPerPage=3600&filter={"userWord.optional.isLearned":"learned"}`;
  let contentAuth: IDictAuth[] = [];

  const rawResponse = await fetch(url, ARGS_AUTH);
  if (rawResponse.status === 200) {
    contentAuth = await rawResponse.json();
  }
  const content = contentAuth[0].paginatedResults;
  return content;
};
