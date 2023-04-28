import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetItems } from '../../hooks/useGetItems';
import { ItemListPage } from './ItemList.page';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../hooks/useGetItems');

const mockItems = [
  {
    id: '123',
    title: 'Test Item',
    picture: 'test.jpg',
    price: {
      currency: 'ARS',
      amount: 1000,
      decimals: 2,
    },
    condition: 'new',
    sold_quantity: '10',
    free_shipping: true,
    city_name: 'Bogota',
  },
];

describe('ItemListPage', () => {
  const mockNavigate = jest.fn();
  const mockUseGetItems = useGetItems as jest.MockedFunction<
    typeof useGetItems
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    mockUseGetItems.mockReturnValue({
      loading: false,
      items: mockItems,
      categories: ['Category 1', 'Category 2'],
    });
  });

  it('renders items list and breadcrumb', () => {
    render(<ItemListPage />);

    const { categories } = mockUseGetItems();

    const breadcrumb = document.querySelector('.breadcrumb');
    expect(breadcrumb).toBeDefined();
    expect(breadcrumb?.textContent).toContain(categories.join(''));

    const categoryList = document.querySelectorAll('.breadcrumb li');
    expect(categoryList).toBeDefined();
    expect(categoryList.length).toBe(categories.length);

    const itemList = document.querySelectorAll('.item-list__content article');
    expect(itemList).toBeDefined();
    expect(itemList.length).toBe(mockItems.length);
  });

  it('navigates to item detail on item row click', () => {
    render(<ItemListPage />);

    const itemRow = screen.getByText(mockItems[0].title);
    fireEvent.click(itemRow);

    expect(mockNavigate).toHaveBeenCalledWith(`/items/${mockItems[0].id}`);
  });

  it('displays loader when items are loading', () => {
    mockUseGetItems.mockReturnValue({
      loading: true,
      items: [],
      categories: [],
    });

    render(<ItemListPage />);

    const loader = document.querySelector('.loader');
    expect(loader).toBeDefined();
  });

  it('displays not found message when there are no items', () => {
    mockUseGetItems.mockReturnValue({
      loading: false,
      items: [],
      categories: [],
    });

    render(<ItemListPage />);

    const notFound = screen.getByText('No results found');
    expect(notFound).toBeDefined();
  });
});
