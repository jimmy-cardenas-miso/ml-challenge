import { fireEvent, render, screen } from '@testing-library/react';

import { Item } from '../../models/item.model';
import { currencyFormat } from '../../utilities/currencyFormatter';
import { RowItem } from './RowItem';

const item: Item = {
  id: 'ASD123',
  title: 'Example Item',
  picture: 'http://example.com/item.jpg',
  price: {
    currency: 'ARS',
    amount: 1000,
    decimals: 2,
  },
  condition: 'new',
  city_name: 'Buenos Aires',
  free_shipping: true,
};

describe('RowItem', () => {
  it('should render item information correctly', () => {
    render(<RowItem item={item} handle={() => {}} />);

    const titleElement = screen.getByText(item.title);
    expect(titleElement).toBeDefined();

    const priceElement = document.querySelector('.row-item__price');
    expect(priceElement).toBeDefined();
    expect(priceElement?.textContent).toEqual(
      currencyFormat(
        item.price.amount,
        item.price.currency,
        item.price.decimals,
      ),
    );

    const locationElement = screen.getByText(item.city_name);
    expect(locationElement).toBeDefined();

    const deliveryIconElement = screen.getByAltText('Envio');
    expect(deliveryIconElement).toBeDefined();
  });

  it('should call handle function when clicked', () => {
    const handleMock = jest.fn();
    render(<RowItem item={item} handle={handleMock} />);

    const articleElement = screen.getByText(item.title);
    fireEvent.click(articleElement);

    expect(handleMock).toHaveBeenCalledWith(item);
  });
});
