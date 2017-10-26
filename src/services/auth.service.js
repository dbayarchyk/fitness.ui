let instance = null;

class AuthService {
  token = localStorage.getItem('token');
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
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  logout = () => {
    localStorage.removeItem('token');
    this.userId = null;
  }
}

export default new AuthService();
