import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ItemContext } from '../contexts/Item.Context';
import { Item } from '../models/item.model';
import { QueryResponse } from '../models/item-response.model';
import { getItems } from '../services/items.service';

export const useGetItems = (): {
  loading: boolean;
  items: Item[];
  categories: string[];
} => {
  const { categories, setCategories } = useContext(ItemContext);
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([] as Item[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const executeQuery = async (query: string) => {
      try {
        setLoading(true);
        setItems([]);
        setCategories([]);

        const { items, categories }: QueryResponse = await getItems(query);

        setLoading(false);
        setItems(items ?? []);
        setCategories(categories);
      } catch (e) {
        setLoading(false);
      }
    };

    executeQuery(searchParams.get('search') ?? '');
  }, [searchParams]);

  return { loading, items, categories };
};
