import IDictWord from '../interfaces/IDictWord';
import IDictAuth from '../interfaces/IDictAuth';
import { IWordOpt } from '../interfaces/IWordOpt';

export const baseUrl = 'https://rslang29.herokuapp.com';

const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');

const argsDef = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
  },
};

const argsAuth = {
  method: 'GET',
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  },
};

const objHeaders = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const getWordsTextbook = async (group: number, page: number, isAuth: boolean) => {
  let url = `${baseUrl}/words?group=${group}&page=${page}`;
  if (isAuth) {
    url = `${baseUrl}/users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=20`;
  }
  const args = isAuth ? argsAuth : argsDef;

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
  let contentGetResp;
  const getResponse = await fetch(url, argsAuth);
  if (getResponse.status === 200) {
    contentGetResp = await getResponse.json();
    isUserWord = true;
  }
  console.log('get contentGetResp', contentGetResp);
  const respBody = JSON.stringify({
    ...contentGetResp,
    difficulty: 'difficult',
    optional: { isLearned: 'no' },
  });
  console.log('respBody', JSON.parse(respBody));
  const currentMethod = isUserWord ? 'PUT' : 'POST';
  const requestParams = {
    method: currentMethod,
    withCredentials: true,
    headers: objHeaders,
    body: respBody,
  };

  const rawResponse = await fetch(url, requestParams);
  if (rawResponse.status === 200) {
    const content = await rawResponse.json();
    console.log('content', content);
  }
};

export const createLearnedWord = async (wordId: string) => {
  const url = `${baseUrl}/users/${userId}/words/${wordId}`;
  if (!userId || !token) return;

  let isUserWord = false;
  const getResponse = await fetch(url, argsAuth);
  let contentGetResp;
  if (getResponse.status === 200) {
    contentGetResp = await getResponse.json();
    isUserWord = true;
    console.log('get contentGetResp', Object.keys(contentGetResp));
  }

  const currentMethod = isUserWord ? 'PUT' : 'POST';
  const requestParams = {
    method: currentMethod,
    withCredentials: true,
    headers: objHeaders,
    body: JSON.stringify({
      difficulty: 'easy',
      optional: {
        isLearned: 'learned',
      },
    }),
  };

  const rawResponse = await fetch(url, requestParams);
  if (rawResponse.status === 200) {
    const content = await rawResponse.json();
    console.log(content);
  }
};

export const filterDifficultWords = async () => {
  console.log('DIFF');
  const url = `${baseUrl}/users/${userId}/aggregatedWords?wordsPerPage=3600&filter={"userWord.difficulty":"difficult"}`;

  const rawResponse = await fetch(url, argsAuth);
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

  const rawResponse = await fetch(url, argsAuth);
  if (rawResponse.status === 200) {
    contentAuth = await rawResponse.json();
  }
  const content = contentAuth[0].paginatedResults;
  console.log('content', content);
  return content;
};

export const removeDifficultWord = async (wordId: string) => {
  const url = `${baseUrl}/users/${userId}/words/${wordId}`;
  if (!userId || !token) return;

  const requestParams = {
    method: 'PUT',
    withCredentials: true,
    headers: objHeaders,
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

  const requestParams = {
    method: 'PUT',
    withCredentials: true,
    headers: objHeaders,
    body: JSON.stringify({
      optional: {},
    }),
  };

  const rawResponse = await fetch(url, requestParams);
  if (rawResponse.status === 200) {
    const content = await rawResponse.json();
    console.log(content);
  }
};
