import './rowItem.sass';

import { FC } from 'react';

import deliveryIcon from '../../assets/delivery.png';
import { Item } from '../../models/item.model';
import { currencyFormat } from '../../utilities/currencyFormatter';

type Props = {
  item: Item;
  handle: (item: Item) => void;
};
export const RowItem: FC<Props> = ({ item, handle }) => {
  return (
    <article
      id={item.id.toString()}
      className="row-item"
      onClick={() => handle(item)}
    >
      <img className="row-item__image" src={item.picture} alt={item.title} />

      <figcaption className="row-item__info">
        <div className="row-item__panel">
          <div className="row-item__head">
            <p className="row-item__price">
              {currencyFormat(
                item.price.amount,
                item.price.currency,
                item.price.decimals,
              )}
            </p>
            {item.free_shipping && <img src={deliveryIcon} alt="Envio" />}
          </div>
          <span className="row-item__location">{item.city_name}</span>
        </div>
        <button>
          <h3 className="row-item__title">{item.title}</h3>
        </button>
      </figcaption>
    </article>
  );
};
