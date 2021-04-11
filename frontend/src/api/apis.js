import axios from 'axios';
import { BASE_API_URL, BASE_AUTH_URL, BASE_USERS_URL, BASE_PROJECTS_URL } from '@/constants/apiUrls';

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
