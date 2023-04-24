import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { getItems } from '../../services/items.service';
import { Breadcrumb } from '../../components/Breadcrumb';
import { QueryResponse } from '../../models/item-response.model';
import { Item } from '../../models/item.model';
import { RowItem } from '../../components/RowItem';
import { ItemContext } from '../../contexts/Item.Context';
import './itemList.sass';

export const ItemListPage = () => {
  const navigate = useNavigate();
  const { categories, setCategories } = useContext(ItemContext);
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([] as Item[]);

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
  }, [searchParams]);

  return (
    <div className="item-list">
      <Breadcrumb list={categories}></Breadcrumb>
      <ul className="item-list__content">
        {items?.length > 0 &&
          items.map((item) => (
            <RowItem
              key={item.id.toString()}
              item={item}
              handle={redirectDetail}
            />
          ))}
      </ul>
    </div>
  );
};
