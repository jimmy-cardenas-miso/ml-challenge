import { renderHook, waitFor } from '@testing-library/react';
import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Item } from '../models/item.model';
import { getItems } from '../services/items.service';
import { useGetItems } from './useGetItems';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useSearchParams: jest
    .fn()
    .mockReturnValue([new URLSearchParams({ search: 'ASD' })]),
}));

jest.mock('../contexts/Item.Context', () => ({
  ItemContext: { categories: ['Category 1', 'Category 2'] },
}));

jest.mock('../services/items.service', () => ({
  getItems: jest.fn(),
}));

describe('useGetItems', () => {
  const mockItemId = 'mockItemId';
  const mockItem: Item = {
    id: mockItemId,
    title: 'Mock Item',
    price: {
      currency: 'ARS',
      amount: 100,
      decimals: 0,
    },
    picture: 'https://mock-picture.com',
    condition: 'new',
    free_shipping: true,
    sold_quantity: '0',
    city_name: 'Bogota',
  };
  const itemsMock = [mockItem, mockItem];
  const categoriesMock = ['Category 1', 'Category 2'];

  const mockSearchParams = [new URLSearchParams({ search: 'ASD' })];
  const mockContext = { categories: ['Category 1', 'Category 2'] };

  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    (useContext as jest.Mock).mockReturnValue(mockContext);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an empty array of items and categories when searchParams is empty', async () => {
    (getItems as jest.Mock).mockResolvedValue({
      items: [],
      categories: [],
    });

    const { result } = renderHook(() => useGetItems());

    expect(result.current.loading).toBe(false);
    expect(result.current.items).toEqual([]);
    expect(result.current.categories).toEqual(categoriesMock);

    await waitFor(() => {
      expect(getItems).toHaveBeenCalledTimes(0);

      expect(result.current.loading).toBe(false);
      expect(result.current.items).toEqual([]);
      expect(result.current.categories).toEqual(categoriesMock);
    });
  });

  it('should return items and categories when searchParams is not empty', async () => {
    (getItems as jest.Mock).mockResolvedValue({
      items: itemsMock,
      categories: categoriesMock,
    });

    const { result } = renderHook(() => useGetItems());

    await waitFor(() => {
      expect(getItems).toHaveBeenCalledTimes(0);

      expect(result.current.loading).toBe(false);
      expect(result.current.items).toEqual([]);
      expect(result.current.categories).toEqual(categoriesMock);
    });
  });

  it('should return empty array of items and categories when an error occurs', async () => {
    (getItems as jest.MockedFunction<typeof getItems>).mockRejectedValueOnce(
      'error',
    );

    const { result } = renderHook(() => useGetItems());

    expect(result.current.loading).toBe(false);
    expect(result.current.items).toEqual([]);
    expect(result.current.categories).toEqual(categoriesMock);

    await waitFor(() => {
      expect(getItems).toHaveBeenCalledTimes(0);

      expect(result.current.loading).toBe(false);
      expect(result.current.items).toEqual([]);
      expect(result.current.categories).toEqual(categoriesMock);
    });
  });
});
