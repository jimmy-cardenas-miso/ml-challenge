import { QueryResponse } from '../../../models/item-response.model';
import { getItems } from '../../../services/items.service';
import { AppDispatch } from '../../store';
import { fetchItems, fetchItemsError, fetchItemsSuccess } from './searchSlice';

export const searchItems = (query: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchItems());

    try {
      const { items, categories }: QueryResponse = await getItems(query);
      dispatch(fetchItemsSuccess({ items, categories }));
    } catch ({ message: error }) {
      dispatch(fetchItemsError({ error }));
    }
  };
};
