import IDictWord from '../interfaces/IDictWord';

export const baseUrl = 'https://rslang29.herokuapp.com';

const getWordsTextbook = async (group: number, page: number) => {
  const rawResponse = await fetch(`${baseUrl}/words?group=${group}&page=${page}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  const content: IDictWord[] = await rawResponse.json();

  return content;
};

export default getWordsTextbook;
