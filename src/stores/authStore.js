/**
 * Store for authentication logic, registration, creating auth tokens, and clearing auth storage.
 * Removing a circular dependency by just directly calling the logout() route instead of importing agents
 *
 */
import { observable, action } from 'mobx';
import Cookies from 'js-cookie';
import axios from 'axios';
import ActionsUtil from '../utils/actionsUtil';
import queryString from 'query-string'

const AUTH_COOKIE_NAME = 'sessionToken';
const AUTH_COOKIE_LOGIN = 'loggedIn';
const AUTH_COOKIE_KEY = 'jwt';
const AUTH_REFRESH_TOKEN = 'refreshToken';
const AUTH_USER_META = 'user-meta';
//const COOKIE_PROPS = { path: '/', domain: '.sleepless-gamers.com', expires: 0.25, secure: true, sameSite: 'strict' };
const gamingApiBaseURL = `${process.env.REACT_APP_API_GAMING_URL}`;
class AuthStore {
  @observable
  token = Cookies.get(AUTH_COOKIE_KEY);

  @observable
  refreshToken = Cookies.get(AUTH_REFRESH_TOKEN);

  @action
  setToken = (token) => {
    this.token = token;
    Cookies.set(AUTH_COOKIE_KEY, token);
    Cookies.set(AUTH_COOKIE_NAME, true);
  };

  @action
  setRefreshToken = (refreshToken) => {
    this.refreshToken = refreshToken;
    Cookies.set(AUTH_REFRESH_TOKEN, refreshToken);
    Cookies.set(AUTH_COOKIE_NAME, true);
  };

  @action
  getRefreshToken = () => {
    return this.refreshToken;
  };

  @action
  clearRefreshToken = () => {
    Cookies.remove(AUTH_REFRESH_TOKEN);
    this.refreshToken = null;
  };

  clearSession = () => {
    this.setToken(undefined);
    this.clearRefreshToken();
    Cookies.remove(AUTH_COOKIE_KEY);
    Cookies.remove(AUTH_COOKIE_LOGIN);
    Cookies.remove(AUTH_USER_META);
    Cookies.remove(AUTH_COOKIE_NAME);
    Cookies.remove(AUTH_COOKIE_NAME);
    Cookies.remove(AUTH_USER_META);
  };

  @action
  createUser(data) {
    axios({
      method: 'post',
      url: `${gamingApiBaseURL}/register`,
      data,
    }).catch(() => {
      console.log('Error creating a new user account');
    });
  }

  @action
  userLoggedIn() {
    return Cookies.get(AUTH_COOKIE_LOGIN)
  }

  @action
  login(data) {
    axios({
      method: 'post',
      url: `${gamingApiBaseURL}/login`,
      data,
    })
      .then((response) => {
        this.setToken(response.accessToken);
        this.setRefreshToken(response.refreshToken);
        Cookies.set(AUTH_COOKIE_LOGIN, true);
        ActionsUtil.handleLoggedInRedirect();
      })
      .catch((error) => {
        console.log('Error getting login credentials', error);
      });
  }

  @action
  logout = () => {
    axios({
      method: 'post',
      url: `${gamingApiBaseURL}/logout`,
      headers: { Authorization: `Bearer ${this.token}` },
    })
      .then(() => {
        this.clearSession();
        // Redirect to login page
        ActionsUtil.handleLoggedOutRedirect();
      })
      .catch(() => {
        this.clearSession();
      });
  };

  @action
  validateVerificationCode = () => {
    axios({
      method: 'get',
      url: `${gamingApiBaseURL}/verify-email`,
    })
      .then((response) => {
        const parsed = queryString.parse(location.search)

        if (parsed.token && (parsed.token === response.verificationCode)) {
          ActionsUtil.handleVerifyRedirect();
        }
      })
      .catch((error) => {
        console.log("Error getting verification code", error)
      });
  }
}

export default new AuthStore();
