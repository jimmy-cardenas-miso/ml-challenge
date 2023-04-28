import { ItemResponse, QueryResponse } from '../models/item-response.model';
import { axiosApi } from '../utilities/axiosApi';

export function getItems(query: string): Promise<QueryResponse> {
  return axiosApi.get(`?q=${query}`).then(({ data }) => data);
}
