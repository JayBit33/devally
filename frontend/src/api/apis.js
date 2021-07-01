import axios from 'axios';
import { BASE_API_URL, BASE_ARTICLE_URL, BASE_AUTH_URL, BASE_CHAT_URL, BASE_USERS_URL, BASE_PROJECTS_URL } from '@/constants/apiUrls';

export const baseAPI = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
  headers: {
    'content-type': 'application/json',
    'api-version': 1
  },
  crossDomain: true
});

export const usersAPI = axios.create({
  baseURL: BASE_USERS_URL,
  withCredentials: true,
  headers: {
    'content-type': 'application/json',
    'api-version': 1,
    // 'authorization': 'Bearer ' + getAccessToken()
  },
  crossDomain: true
});

export const projectsAPI = axios.create({
  baseURL: BASE_PROJECTS_URL,
  withCredentials: true,
  headers: {
    'content-type': 'application/json',
    'api-version': 1
  },
  crossDomain: true
});

export const authAPI = axios.create({
  baseURL: BASE_AUTH_URL,
  withCredentials: true,
  headers: {
    'content-type': 'application/json',
    'api-version': 1
  },
  crossDomain: true
});

export const articleAPI = axios.create({
  baseURL: BASE_ARTICLE_URL,
  withCredentials: false,
  headers: {
    'content-type': 'application/json',
  },
  crossDomain: true
});
export const chatAPI = axios.create({
  baseURL: BASE_CHAT_URL,
  withCredentials: true,
  headers: {
    'content-type': 'application/json',
    'api-version': 1
  },
  crossDomain: true
});
