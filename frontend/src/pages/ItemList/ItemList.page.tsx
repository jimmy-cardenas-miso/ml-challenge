import './itemList.sass';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Breadcrumb } from '../../components/Breadcrumb';
import { RowItem } from '../../components/RowItem';
import { useGetItems } from '../../hooks/useGetItems';
import { Item } from '../../models/item.model';

export const ItemListPage = () => {
  const navigate = useNavigate();
  const { loading, items, categories } = useGetItems();

  const redirectDetail = (item: Item) => {
    navigate(`/items/${item.id}`);
  };

  if (loading) return <p className="loader"></p>;
  if (!(items?.length > 0))
    return <p className="not-found">No results found</p>;

  return (
    <section className="item-list">
      <Breadcrumb list={categories}></Breadcrumb>
      <div className="item-list__content">
        {items?.length > 0 &&
          items.map((item) => (
            <RowItem
              key={item.id.toString()}
              item={item}
              handle={redirectDetail}
            />
          ))}
      </div>
    </section>
  );
};
