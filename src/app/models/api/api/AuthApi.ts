class Api {
  private base = 'https://rslang29.herokuapp.com/' as string;

  private users = `${this.base}users` as string;

  private signin = `${this.base}signin` as string;

  userId: string;

  email: string;

  token: string;

  refreshToken: string;

  constructor() {
    this.userId = localStorage.getItem('userId') as string;
    this.email = localStorage.getItem('email') as string;
    this.token = localStorage.getItem('token') as string;
    this.refreshToken = localStorage.getItem('refreshToken') as string;
  }

  registerUser = async (name: string, email: string, password: string) => {
    const response = await fetch(this.users, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const res = await response;
    let result;
    if (res.ok) {
      const data = await res.json();
      const signInRes = await this.signInUser(data.email, password);
      if (signInRes.isSucceeded) {
        result = { isSucceeded: true, status: res.status, data };
        return result;
      }
    }
    result = { isSucceeded: false, status: res.status };
    return result;
  };

  signInUser = async (email: string, password: string) => {
    const response = await fetch(this.signin, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const res = await response;
    let result;
    if (res.ok) {
      const data = await res.json();
      await this.setLocalStorage(data.userId, email, data.token, data.refreshToken);
      result = { isSucceeded: true, status: res.status };
      return result;
    }
    result = { isSucceeded: false, status: res.status };
    return result;
  };

  getAllWords = async (group = 1, page = 1) => {
    const response = (await fetch(`${this.base}words?group=${group}&page=${page}`)).json();
    return response;
  };

  getWordById = async (wordId: string) => {
    const response = (await fetch(`${this.base}words/${wordId}`)).json();
    return response;
  };

  setLocalStorage = async (userId: string, email: string, token: string, refreshToken: string) => {
    Object.assign(this, {
      userId,
      email,
      token,
      refreshToken,
    });
    localStorage.setItem('userId', userId);
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    return true;
  };
}
export default Api;
