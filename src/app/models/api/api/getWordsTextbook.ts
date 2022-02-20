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
    console.log('contentAuth', contentAuth);
    console.log('content', content);
  } else if (!isAuth && rawResponse.status === 200) {
    content = await rawResponse.json();
    console.log('content', content);
  }
  return content;
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
    if (contentCurrentResp.optional) {
      Object.assign(contentGetResp.optional, contentCurrentResp.optional, {
        isLearned: 'no',
      });
    }
  }
  console.log('get contentGetResp', contentGetResp);
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
    console.log('content', content);
  }
};

export const resetStatistics = async () => {
  const url = `${baseUrl}/users/${userId}/statistics`;
  const defContent: IStats = {
    learnedWords: 0,
    optional: {},
  };
  const requestParams = {
    method: 'PUT',
    withCredentials: true,
    headers: OBJ_HEADERS,
    body: JSON.stringify(defContent),
  };
  await fetch(url, requestParams);
};

export const getStatistics = async () => {
  const url = `${baseUrl}/users/${userId}/statistics`;
  const rawResponse = await fetch(url, ARGS_AUTH);
  let content: IStats = {};
  if (rawResponse.status === 200) {
    console.log('fetch stats');
    content = await rawResponse.json();
  } else {
    console.log('NO stats on server');
  }
  return content;
};

export const updateLearnedStats = async (wordId: string) => {
  const url = `${baseUrl}/users/${userId}/statistics`;
  if (!userId || !token) return;
  let learnedBefore = false;
  let statsExist = false;

  const contentGetResp: IStats = {
    learnedWords: 1,
    optional: {
      wordList: {
        stat: [{ wId: wordId, wDate: new Date().toLocaleDateString('ru-RU') }],
      },
    },
  };
  const currentStats = await getStatistics();
  console.log('currentStats', currentStats, 'wordId', wordId);
  if (currentStats?.learnedWords && currentStats.optional?.wordList) {
    statsExist = true;
    delete currentStats.id;
    if (currentStats.optional.wordList?.stat?.find((item) => item.wId === wordId)) {
      learnedBefore = true;
    }
    if (!learnedBefore) {
      currentStats.learnedWords += 1;
      currentStats.optional.wordList.stat?.push({
        wId: wordId,
        wDate: new Date().toLocaleDateString('ru-RU'),
      });
    }
    console.log('learnedBefore', learnedBefore);
  }

  console.log('currStat Before JSON', currentStats);

  const response = statsExist ? currentStats : contentGetResp;

  const respBody = JSON.stringify(response);
  console.log('respBody', respBody);
  const requestParams = {
    method: 'PUT',
    withCredentials: true,
    headers: OBJ_HEADERS,
    body: respBody,
  };

  const rawResponse = await fetch(url, requestParams);
  if (rawResponse.status === 200) {
    const content = await rawResponse.json();
    console.log('pushed stats', content);
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
    if (contentCurrentResp.optional) {
      Object.assign(contentGetResp.optional, contentCurrentResp.optional, {
        isLearned: 'learned',
      });
    }
  }
  console.log('get contentGetResp', contentGetResp);
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
    console.log('content', content);
  }
  await updateLearnedStats(wordId);
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
    console.log(content);
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
    if (contentCurrentResp.optional) {
      Object.assign(contentGetResp.optional, contentCurrentResp.optional, {
        isLearned: 'no',
      });
    }
  }
  console.log('get contentGetResp', contentGetResp);
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
    console.log('content', content);
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
  console.log('content', content);
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
  console.log('content', content);
  return content;
};
