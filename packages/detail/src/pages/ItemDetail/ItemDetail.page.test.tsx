import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { ItemDetailPage } from './ItemDetail.page';
import { useNavigate } from 'react-router-dom';
import { useGetDetail } from "../../hooks/useGetDetail";
import {Item} from "../../models/item.model";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../hooks/useGetDetail');

const mockItem = {
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
};

describe('ItemDetailPage', () => {
  const mockNavigate = jest.fn();
  const mockUseGetDetail = useGetDetail as jest.MockedFunction<
      typeof useGetDetail
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    mockUseGetDetail.mockReturnValue({
      loading: false,
      detail: mockItem,
      categories: ['Category 1', 'Category 2'],
    });
  });

  it('renders loader when loading', async () => {
    mockUseGetDetail.mockReturnValue({
      loading: true,
      detail: undefined as any,
      categories: [],
    });

    render(<ItemDetailPage />);

    await waitFor(() =>
      expect(document.querySelector('.loader')).toBeDefined(),
    );
  });

  it('renders not found message when detail is not present', async () => {
    mockUseGetDetail.mockReturnValue({
      loading: false,
      detail: undefined as any,
      categories: [],
    });

    const { getByText } = render(<ItemDetailPage />);

    await waitFor(() => expect(getByText('Item no encontrado')).toBeDefined());
  });

  it('renders item detail when detail is present', async () => {
    mockUseGetDetail.mockReturnValue({
      loading: false,
      detail: mockItem,
      categories: ['Category 1', 'Category 2'],
    });

    render(<ItemDetailPage />);

    await waitFor(() =>
      expect(document.querySelector('.detail__title')).toBeDefined(),
    );
    await waitFor(() =>
      expect(document.querySelector('.detail__price')).toBeDefined(),
    );
  });
});
