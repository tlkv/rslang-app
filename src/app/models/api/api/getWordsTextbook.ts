const getWordsTextbook = async (group: number, page: number) => {
  const rawResponse = await fetch(
    `https://react-learnwords-example.herokuapp.com/words?group=${group}&page=${page}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
  );
  const content = await rawResponse.json();

  return content;
};

export default getWordsTextbook;
