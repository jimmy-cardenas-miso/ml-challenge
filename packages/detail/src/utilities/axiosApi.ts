import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: `https://us-central1-ml-challenge-c9f9c.cloudfunctions.net/app/api/items`,
});
