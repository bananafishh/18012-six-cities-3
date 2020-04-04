import axios from 'axios';

// eslint-disable-next-line no-unused-vars
export const createApi = (dispatch) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  return api;
};
