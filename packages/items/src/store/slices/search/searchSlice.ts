import { createSlice } from '@reduxjs/toolkit';

import { Item } from '../../../models/item.model';
import { RootState } from '../../store';

interface SearchState {
  loading: boolean;
  items: Item[];
  categories: string[];
  error: string;
}

const initialState: SearchState = {
  loading: false,
  items: [],
  categories: [],
  error: '',
};
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    fetchItems: (state) => {
      state.loading = true;
      state.items = [];
      state.categories = [];
      state.error = '';
    },
    fetchItemsSuccess: (state, { payload }) => {
      const { items, categories } = payload;
      state.loading = false;
      state.items = items;
      state.categories = categories;
    },
    fetchItemsError: (state, { payload }) => {
      const { error } = payload;
      state.loading = false;
      state.error = error;
    },
  },
});

export const { fetchItems, fetchItemsSuccess, fetchItemsError } =
  searchSlice.actions;
export const selectSearch = (state: RootState) => state.search;
