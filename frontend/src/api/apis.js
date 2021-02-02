import axios from 'axios';
import { BASE_AUTH_URL, BASE_USERS_URL } from '@/constants/apiUrls';

export const userAPI = axios.create({
  baseURL: BASE_USERS_URL,
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
