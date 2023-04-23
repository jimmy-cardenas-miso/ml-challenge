import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getItems } from '../services/items.service';
import { Breadcrumb } from '../components/Breadcrumb';
import { QueryResponse } from '../models/query.model';
import { Item } from '../models/item.model';
import { RowItem } from '../components/RowItem';

export const ItemListPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([] as Item[]);
  const [categories, setCategories] = useState([] as string[]);

  const redirectDetail = (item: Item) => {
    navigate(`/items/${item.id}`);
  };

  useEffect(() => {
    const executeQuery = async (query: string) => {
      const data: QueryResponse = await getItems(query);
      setItems(data.items);
      setCategories(data.categories);
    };

    executeQuery(searchParams.get('search') ?? '');
  }, []);

  return (
    <>
      <Breadcrumb list={categories}></Breadcrumb>
      <ul className="border">
        {items?.length > 0 &&
          items.map((item) => <RowItem item={item} handle={redirectDetail} />)}
      </ul>
    </>
  );
};
