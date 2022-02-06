const testApi = async () => {
  const rawResponse = await fetch(
    'https://react-learnwords-example.herokuapp.com/words?group=1&page=1',
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

export default testApi;
