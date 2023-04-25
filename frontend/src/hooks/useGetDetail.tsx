import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Item } from '../models/item.model';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { searchItemDetail, selectDetail } from '../store/slices/detail';

export const useGetDetail = (): {
  loading: boolean;
  detail: Item;
  categories: string[];
} => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading, detail, categories } = useAppSelector(selectDetail);

  useEffect(() => {
    dispatch(searchItemDetail(id ?? ''));
  }, []);

  return { loading, detail, categories };
};
