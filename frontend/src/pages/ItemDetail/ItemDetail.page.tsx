import './itemDetail.sass';

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Breadcrumb } from '../../components/Breadcrumb';
import { ItemContext } from '../../contexts/Item.Context';
import { Item } from '../../models/item.model';
import { ItemResponse } from '../../models/item-response.model';
import { getItemDetail } from '../../services/items.service';
import { currencyFormat } from '../../utilities/currencyFormatter';

export const ItemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories } = useContext(ItemContext);
  const [detail, setDetail] = useState({} as Item);

  useEffect(() => {
    const executeQuery = async (id: string) => {
      const { item }: ItemResponse = await getItemDetail(id);
      setDetail(item);
    };

    executeQuery(id ?? '');
  }, []);

  if (!detail.title) {
    return <></>;
  }

  return (
    <article className="detail">
      <div className="detail__nav">
        <button onClick={() => navigate(-1)}>
          <p>Volver al listado</p>
        </button>
        <Breadcrumb list={categories}></Breadcrumb>
      </div>

      <div className="detail__container">
        <div>
          <div className="detail__image-container">
            <img
              className="detail__image"
              src={detail.picture}
              alt={detail.title}
            />
          </div>
          <figcaption className="detail__specs">
            <p className="detail__specs-title">Descripción del producto</p>
            <h1 className="detail__specs-description">{detail.title}</h1>
          </figcaption>
        </div>

        <div className="detail__info">
          <h3 className="detail__condition">
            {detail.condition} - {detail.sold_quantity} vendidos
          </h3>
          <p className="detail__title">{detail.title}</p>
          <h2 className="detail__price">
            {currencyFormat(detail.price.amount)}
          </h2>

          <div className="detail__button">
            <button className="btn-primary">Comprar</button>
          </div>
        </div>
      </div>
    </article>
  );
};
