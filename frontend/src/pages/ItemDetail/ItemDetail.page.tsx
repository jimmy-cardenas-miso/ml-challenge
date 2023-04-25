import './itemDetail.sass';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Breadcrumb } from '../../components/Breadcrumb';
import { useGetDetail } from '../../hooks/useGetDetail';
import { currencyFormat } from '../../utilities/currencyFormatter';

export const ItemDetailPage = () => {
  const navigate = useNavigate();
  const { loading, detail, categories } = useGetDetail();

  if (loading) return <p className="loader"></p>;
  if (!detail?.title) return <p className="not-found">Item no encontrado</p>;

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
            {currencyFormat(
              detail.price.amount,
              detail.price.currency,
              detail.price.decimals,
            )}
          </h2>

          <div className="detail__button">
            <button className="btn-primary">Comprar</button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ItemDetailPage;
