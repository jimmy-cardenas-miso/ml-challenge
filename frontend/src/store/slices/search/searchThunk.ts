import { fetchItems, setResults } from './searchSlice';
import { QueryResponse } from '../../../models/item-response.model';
import { getItems } from '../../../services/items.service';
import { AppDispatch } from '../../store';

export const searchItems = (query: string) => {
  return async (dispatch: AppDispatch, state) => {
    dispatch(fetchItems());

    const { items, categories }: QueryResponse = await getItems(query);

    dispatch(setResults({ items, categories }));
  };
};
