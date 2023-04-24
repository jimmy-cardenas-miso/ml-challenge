import { FC } from 'react';

import './rowItem.sass';
import { currencyFormat } from '../../utilities/currencyFormatter';
import deliveryIcon from '../../assets/delivery.png';
import { Item } from '../../models/item.model';

type Props = {
  item: Item;
  handle: (item: Item) => void;
};
export const RowItem: FC<Props> = ({ item, handle }) => {
  return (
    <div
      id={item.id.toString()}
      className="row-item"
      onClick={() => handle(item)}
    >
      <img className="row-item__image" src={item.picture} alt={item.title} />

      <div className="row-item__info">
        <div className="row-item__panel">
          <div className="row-item__head">
            <h2 className="row-item__price">
              {currencyFormat(item.price.amount)}
            </h2>
            {item.free_shipping && <img src={deliveryIcon} alt="Envio" />}
          </div>
          <span className="row-item__location">{item.city_name}</span>
        </div>
        <h3 className="row-item__title">{item.title}</h3>
      </div>
    </div>
  );
};
