/**
 * Uses fetch to support ajax requests.
 */
import axios from 'axios';
import { debounce } from 'lodash';
import jwt from 'jwt-decode';
import moment from 'moment';
import Cookies from 'js-cookie';
import authStore from '../stores/authStore';

const gamingApiBaseURL = `${process.env.REACT_APP_API_GAMING_URL}`;
let retry401 = false;
let retry403 = false;
let checkingForValidToken = false;

// Setup an interceptor to handle error responses
axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Redirect if we received a 401
      if (error.response.status === 401 && !window.location.hostname.match(/^localhost$/)) {
        const { token } = authStore;
        const userToken = jwt(token);
        const hasValidJwt = !!userToken && !!userToken.exp && userToken.exp > moment().unix();
        if (hasValidJwt && !retry401) {
          retry401 = true;
          return axios.request(error.config).then((response) => {
            retry401 = false;
            return response;
          }); // NO catch -- Should go through this same interceptor and log user out if 401 or return other errors
        }
        // Otherwise, logout
        authStore.logout();
      }

      // If 403, retry once
      if (error.response.status === 403) {
        if (!retry403) {
          retry403 = true;
          return axios.request(error.config).then((response) => {
            if (response && response.data && response.data.error) {
              retry403 = false;
              return Promise.reject(error);
            }
            retry403 = false;
            return response;
          });
        }
        // retry403 was set, so we were already retrying once.
        // If here, assumed the retry failed. Return error response and reset var for next potential 403
        retry403 = false;
      }
    }
    return Promise.reject(error);
  }
);

// We will send along these headers with each request
function getHeaders(additionalHeaders) {
  const { token } = authStore;
  const globalHeaders = additionalHeaders ? { ...additionalHeaders } : {};

  if (token) {
    globalHeaders.Authorization = `Bearer ${token}`;
  }
  return globalHeaders;
}

function isValidToken() {
  if (checkingForValidToken || !Cookies.get('loggedIn')) {
    return; // we only want to check once or if user is not logged in.
  }
  const threshold = 7200; // 2 hours
  const { token } = authStore;
  const refreshToken = authStore.getRefreshToken();
  const userToken = token ? jwt(token) : null;
  const timeStamp = moment().unix();
  checkingForValidToken = true;
  if (userToken && userToken.exp) {
    const difference = userToken.exp - timeStamp;
    if (difference > 0 && difference <= threshold) {
      // If we have a refresh token, proceed
      if (refreshToken) {
        checkingForValidToken = true;
      } else {
        // If no refresh token, log user out -- Expired
        // authStore.logout();
      }
    } else {
      checkingForValidToken = false;
    }
  }
}

const debouncedIsValidToken = debounce(isValidToken, 2000); // Check for valid token every time we make a logged in request

// Make a request, but first, check to see if the jwt token will expire soon.
function makeRequest(method, url, data, responseType) {
  // Call the function to ensure that we have a recently refreshed token
  debouncedIsValidToken();
  if (method === 'get' || method === 'delete') {
    return axios({
      method,
      url,
      responseType: responseType || '',
      headers: getHeaders(),
    });
  }
  return axios({
    method,
    url,
    data,
    headers: getHeaders(),
  });
}

const requests = {
  get: (url, responseType) => makeRequest('get', url, undefined, responseType),
  post: (url, data) => makeRequest('post', url, data),
  put: (url, data) => makeRequest('put', url, data),
  delete: (url, responseType) => makeRequest('delete', url, undefined, responseType),
};

const auth = {
  getUserMeta: () => requests.get(`${gamingApiBaseURL}/user-meta`),
  getToken: () => requests.get(`${gamingApiBaseURL}/token`),
  createUser: (data) => requests.post(`${gamingApiBaseURL}/register`, data),
  login: () => requests.post(`${gamingApiBaseURL}/login`),
  logout: () => requests.post(`${gamingApiBaseURL}/logout`),
};

const storageBucket = {
  getVideo: () => requests.get(`${gamingApiBaseURL}/video`),
};

const streaming = {
  createStream: () => requests.get(`${gamingApiBaseURL}/video/create-stream`),
  getStream: () => requests.get(`${gamingApiBaseURL}/video/get-stream`),
  currentStream: () => requests.get(`${gamingApiBaseURL}/video/current-stream`),
};

export default {
  auth,
  streaming,
  storageBucket,
};
