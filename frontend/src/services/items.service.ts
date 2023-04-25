import { ItemResponse, QueryResponse } from '../models/item-response.model';
import { axiosApi } from '../utilities/axiosApi';

export function getItems(query: string): Promise<QueryResponse> {
  return axiosApi.get(`?q=${query}`).then(({ data }) => data);
}

export async function getItemDetail(id: string): Promise<ItemResponse> {
  return axiosApi.get(id).then(({ data }) => data);
}
