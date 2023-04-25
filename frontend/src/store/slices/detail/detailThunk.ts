import { ItemResponse } from '../../../models/item-response.model';
import { getItemDetail } from '../../../services/items.service';
import { AppDispatch } from '../../store';
import {
  fetchDetail,
  fetchDetailError,
  fetchDetailSuccess,
} from './detailSlice';

export const searchItemDetail = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchDetail());

    try {
      const { item: detail }: ItemResponse = await getItemDetail(id);
      dispatch(fetchDetailSuccess({ detail }));
    } catch ({ message: error }) {
      dispatch(fetchDetailError({ error }));
    }
  };
};
