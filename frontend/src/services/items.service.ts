import { ItemResponse, QueryResponse } from '../models/item-response.model';

export async function getItems(query: string): Promise<QueryResponse> {
  try {
    const respond = await fetch(`http://localhost:8080/api/items?q=${query}`);
    return await respond.json();
  } catch ({ statusText }) {
    throw new Error(statusText as string);
  }
}

export async function getItemDetail(id: string): Promise<ItemResponse> {
  try {
    const respond = await fetch(`http://localhost:8080/api/items/${id}`);
    return await respond.json();
  } catch ({ statusText }) {
    throw new Error(statusText as string);
  }
}
