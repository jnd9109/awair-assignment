import axios, { AxiosError } from 'axios';

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 1000,
  headers: {
    'Content-type': 'application/json',
  },
});

client.interceptors.response.use(
  (res) => res,
  (error: AxiosError<any>) => {
    console.error(`[${error.response?.status}] ${error.response?.data}`);
    return Promise.reject(error);
  },
);

export default client;
