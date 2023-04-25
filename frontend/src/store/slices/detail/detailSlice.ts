import { createSelector, createSlice } from '@reduxjs/toolkit';

import { Item } from '../../../models/item.model';
import { RootState } from '../../store';
import { selectSearch } from '../search';

interface DetailState {
  loading: boolean;
  detail: Item;
  error: string;
}

const initialState: DetailState = {
  loading: false,
  detail: {} as Item,
  error: '',
};
export const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    fetchDetail: (state) => {
      state.loading = true;
      state.detail = {} as Item;
      state.error = '';
    },
    fetchDetailSuccess: (state, { payload }) => {
      const { detail } = payload;
      state.loading = false;
      state.detail = detail;
    },
    fetchDetailError: (state, { payload }) => {
      const { error } = payload;
      state.loading = false;
      state.error = error;
    },
  },
});

export const { fetchDetail, fetchDetailSuccess, fetchDetailError } =
  detailSlice.actions;
export const selectItemDetail = (state: RootState) => state.detail;
export const selectDetail = createSelector(
  [selectItemDetail, selectSearch],
  (itemDetail, search) => ({ ...itemDetail, categories: search.categories }),
);
