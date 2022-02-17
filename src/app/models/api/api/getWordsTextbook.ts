import IDictWord from '../interfaces/IDictWord';
import IDictAuth from '../interfaces/IDictAuth';

export const baseUrl = 'https://rslang29.herokuapp.com';

export const getWordsTextbook = async (group: number, page: number, isAuth: boolean) => {
  const url = `${baseUrl}/words?group=${group}&page=${page}`;
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const authUrl = `${baseUrl}/users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=20`;
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

  const urlCurrent = isAuth ? authUrl : url;
  const argsCurrent = isAuth ? argsAuth : argsDef;
  const rawResponse = await fetch(urlCurrent, argsCurrent);
  let content: IDictWord[];
  if (isAuth) {
    const contentAuth: IDictAuth[] = await rawResponse.json();
    console.log('contentAuth', contentAuth);
    content = contentAuth[0].paginatedResults;
    console.log('content', content);
  } else {
    content = await rawResponse.json();
    console.log('content', content);
  }
  return content;
};

export const createDifficultWord = async (wordId: string) => {
  // get then post or put
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const url = `${baseUrl}/users/${userId}/words/${wordId}`;
  if (!userId || !token) return;
  // get then post or put!!!
  const requestParams = {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      difficulty: 'difficult',
      optional: {},
    }),
  };
  const requestParams2 = {
    method: 'PUT',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      difficulty: 'difficult',
      optional: {},
    }),
  };

  const requestParams3 = {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  };

  const rawResponse3 = await fetch(url, requestParams3);

  if (rawResponse3.status === 200) {
    const content3 = await rawResponse3.json();
    console.log('get', content3);
  }

  const rawResponse = await fetch(url, requestParams);
  if (rawResponse.status === 200) {
    const content = await rawResponse.json();
    console.log(content);
  }

  const rawResponse2 = await fetch(url, requestParams2);
  if (rawResponse2.status === 200) {
    const content2 = await rawResponse2.json();
    console.log(content2);
  }
};

export const createLearnedWord = async (wordId: string) => {
  // get then post or put
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const url = `${baseUrl}/users/${userId}/words/${wordId}`;
  if (!userId || !token) return;
  const requestParams = {
    method: 'POST',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      difficulty: 'easy',
      optional: {
        isLearned: 'learned',
      },
    }),
  };
  const requestParams2 = {
    method: 'PUT',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
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

  const rawResponse2 = await fetch(url, requestParams2);
  if (rawResponse2.status === 200) {
    const content2 = await rawResponse2.json();
    console.log(content2);
  }
};

export const filterDifficultWords = async () => {
  console.log('DIFF');

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const authUrl = `${baseUrl}/users/${userId}/aggregatedWords?wordsPerPage=3600&filter={"userWord.difficulty":"difficult"}`;

  const argsAuth = {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  };

  const rawResponse = await fetch(authUrl, argsAuth);

  const contentAuth: IDictAuth[] = await rawResponse.json();

  const content = contentAuth[0].paginatedResults;
  console.log('content', content);

  return content;
};

export const filterLearnedWords = async () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const authUrl = `${baseUrl}/users/${userId}/aggregatedWords?wordsPerPage=3600&filter={"userWord.optional.isLearned":"learned"}`;

  const argsAuth = {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  };

  const rawResponse = await fetch(authUrl, argsAuth);

  const contentAuth: IDictAuth[] = await rawResponse.json();

  const content = contentAuth[0].paginatedResults;
  console.log('content', content);

  return content;
};

export const removeDifficultWord = async (wordId: string) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const url = `${baseUrl}/users/${userId}/words/${wordId}`;
  if (!userId || !token) return;
  const requestParams2 = {
    method: 'PUT',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      difficulty: 'easy',
      optional: {},
    }),
  };

  const rawResponse2 = await fetch(url, requestParams2);
  if (rawResponse2.status === 200) {
    const content2 = await rawResponse2.json();
    console.log(content2);
  }
};

export const removeLearnedWord = async (wordId: string) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const url = `${baseUrl}/users/${userId}/words/${wordId}`;
  if (!userId || !token) return;
  const requestParams = {
    method: 'PUT',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      difficulty: 'easy',
      optional: {},
    }),
  };

  const rawResponse = await fetch(url, requestParams);
  if (rawResponse.status === 200) {
    const content2 = await rawResponse.json();
    console.log(content2);
  }
};
