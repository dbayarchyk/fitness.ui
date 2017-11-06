let instance = null;

class AuthService {
  token = localStorage.getItem('f-token');
  userId = localStorage.getItem('userId');

  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  login = (token, userId) => {
    this.token = token;
    this.userId = userId;
    localStorage.setItem('f-token', token);
    localStorage.setItem('userId', userId);
  }

  logout = () => {
    localStorage.removeItem('f-token');
    this.userId = null;
  }
}

export default new AuthService();
