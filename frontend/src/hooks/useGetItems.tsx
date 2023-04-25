import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Item } from '../models/item.model';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { searchItems, selectSearch } from '../store/slices/search';

export const useGetItems = (): {
  loading: boolean;
  items: Item[];
  categories: string[];
} => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { loading, items, categories } = useAppSelector(selectSearch);

  useEffect(() => {
    const query: string = searchParams.get('search') ?? '';
    dispatch(searchItems(query));
  }, []);

  return { loading, items, categories };
};
