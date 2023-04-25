import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: `${process.env.VITE_BASE_URL}/api/items`,
});
