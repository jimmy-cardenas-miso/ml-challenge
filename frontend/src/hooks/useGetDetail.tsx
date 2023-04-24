import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ItemContext } from '../contexts/Item.Context';
import { Item } from '../models/item.model';
import { ItemResponse } from '../models/item-response.model';
import { getItemDetail } from '../services/items.service';

export const useGetDetail = (): {
  loading: boolean;
  detail: Item;
  categories: string[];
} => {
  const { id } = useParams();
  const { categories } = useContext(ItemContext);
  const [detail, setDetail] = useState({} as Item);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const executeQuery = async (id: string) => {
      try {
        setLoading(true);
        setDetail({} as Item);

        const { item }: ItemResponse = await getItemDetail(id);

        setLoading(false);
        setDetail(item);
      } catch (e) {
        setLoading(false);
      }
    };

    executeQuery(id ?? '');
  }, []);

  return { loading, detail, categories };
};
