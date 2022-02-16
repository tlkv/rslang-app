import IDictWord from '../interfaces/IDictWord';

export const baseUrl = 'https://rslang29.herokuapp.com';

export const getWordsTextbook = async (group: number, page: number) => {
  const rawResponse = await fetch(`${baseUrl}/words?group=${group}&page=${page}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  const content: IDictWord[] = await rawResponse.json();

  return content;
};

/* interface IRequestInit extends RequestInit {
  withCredentials: boolean;
} */

export const createDifficultWord = async (wordId: string) => {
  // get then post or put
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
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
  const rawResponse = await fetch(`${baseUrl}/users/${userId}/words/${wordId}`, requestParams);
  if (rawResponse.status === 200) {
    const content = await rawResponse.json();
    console.log(content);
  }

  const rawResponse2 = await fetch(`${baseUrl}/users/${userId}/words/${wordId}`, requestParams2);
  if (rawResponse2.status === 200) {
    const content2 = await rawResponse2.json();
    console.log(content2);
    /* window.location.hash = 'test';
    window.location.reload(); */
  }
};
