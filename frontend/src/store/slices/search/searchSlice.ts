import { createSlice } from '@reduxjs/toolkit';
import { Item } from '../../../models/item.model';
import { RootState } from '../../store';

interface SearchState {
  loading: boolean;
  items: Item[];
  categories: string[];
}

const initialState: SearchState = {
  loading: false,
  items: [],
  categories: [],
};
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    fetchItems: (state) => {
      state.loading = true;
      state.items = [];
    },
    setResults: (state, action) => {
      const { items, categories } = action.payload;
      console.log({ items, categories });
      state.loading = false;
      state.items = items;
      state.categories = categories;
    },
  },
});

export const { fetchItems, setResults } = searchSlice.actions;
export const selectSearch = (state: RootState) => state.search
