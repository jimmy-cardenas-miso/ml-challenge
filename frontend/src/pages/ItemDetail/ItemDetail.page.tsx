import React, { useContext, useEffect, useState } from 'react';
import { ItemResponse } from '../../models/item-response.model';
import { getItemDetail } from '../../services/items.service';
import { useNavigate, useParams } from 'react-router-dom';
import { Item } from '../../models/item.model';
import { currencyFormat } from '../../utilities/currencyFormatter';

import './itemDetail.sass';
import { ItemContext } from '../../contexts/Item.Context';
import { Breadcrumb } from '../../components/Breadcrumb';

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
    <div className="detail">
      <div className="detail__nav">
        <p onClick={() => navigate(-1)}>Volver al listado</p>
        <Breadcrumb list={categories}></Breadcrumb>
      </div>

      <div className="detail__container">
        <div>
          <figure className="detail__image-container">
            <img
              className="detail__image"
              src={detail.picture}
              alt={detail.title}
            />
          </figure>
          <div className="detail__specs">
            <h3 className="detail__specs-title">Descripción del producto</h3>
            <p className="detail__specs-description">{detail.title}</p>
          </div>
        </div>

        <div className="detail__info">
          <div className="detail__condition">
            {detail.condition} - {detail.sold_quantity} vendidos
          </div>
          <p className="detail__title">{detail.title}</p>
          <h1 className="detail__price">
            {currencyFormat(detail.price.amount)}
          </h1>

          <div className="detail__button">
            <button className="btn-primary">Comprar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
