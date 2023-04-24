import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { ItemDetailPage } from './ItemDetail.page';

const navigateMock = jest.fn();
const getDetailMock = jest.fn().mockResolvedValue({
  loading: true,
  detail: {},
  categories: [],
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigateMock,
}));

jest.mock('../../hooks/useGetDetail', () => ({
  ...jest.requireActual('../../hooks/useGetDetail'),
  useGetDetail: () => getDetailMock,
}));

describe('ItemDetailPage', () => {
  beforeEach(() => {
    navigateMock.mockClear();
    getDetailMock.mockClear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders loader when loading', async () => {
    getDetailMock.mockReturnValue({
      loading: true,
      detail: undefined,
      categories: [],
    });

    render(<ItemDetailPage />);

    await waitFor(() =>
      expect(document.querySelector('.loader')).toBeDefined(),
    );
  });

  test('renders not found message when detail is not present', async () => {
    getDetailMock.mockReturnValue({
      loading: false,
      detail: undefined,
      categories: [],
    });

    const { getByText } = render(<ItemDetailPage />);

    await waitFor(() => expect(getByText('Item no encontrado')).toBeDefined());
  });

  test('renders item detail when detail is present', async () => {
    getDetailMock.mockReturnValue({
      loading: false,
      detail: {
        id: '123',
        title: 'Test Item',
        picture: 'test.jpg',
        price: { amount: 1000 },
        condition: 'new',
        sold_quantity: 10,
      },
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
