import axios from 'axios';

type ApiConfig = {
  baseURL: string;
  timeout: number;
  mode: string;
  credentials: string;
  headers: {
    ContentType: string;
    Accept: string;
  };
};
const DEFAULT_API_CONFIG: ApiConfig = {
  baseURL: 'http://localhost',
  timeout: 5000,
  mode: 'cors',
  credentials: 'include',
  headers: {
    ContentType: 'application/json',
    Accept: 'application/json',
  },
};

export const CustomAxios = () => {
  const customAxios = axios.create(DEFAULT_API_CONFIG);
  customAxios.interceptors.response.use(
    (res) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(res);
      }
      return res;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return customAxios;
};
