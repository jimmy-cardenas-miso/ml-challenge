import { renderHook, waitFor } from '@testing-library/react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { getItemDetail } from '../services/items.service';
import { useGetDetail } from './useGetDetail';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('../contexts/Item.Context', () => ({
  ItemContext: { categories: ['Category 1', 'Category 2'] },
}));

jest.mock('../services/items.service', () => ({
  getItemDetail: jest.fn(),
}));

describe('useGetDetail', () => {
  const mockItemId = 'mockItemId';
  const mockItem = {
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
    sold_quantity: 0,
    description: 'Mock item description',
  };
  const mockItemResponse = { item: mockItem };
  const mockParams = { id: mockItemId };
  const mockContext = { categories: ['Category 1', 'Category 2'] };

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue(mockParams);
    (useContext as jest.Mock).mockReturnValue(mockContext);
  });

  it('should return loading and detail as empty object initially', async () => {
    const { result } = renderHook(() => useGetDetail());

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
      expect(result.current.detail).toEqual({});
      expect(result.current.categories).toEqual(mockContext.categories);
    });
  });

  it('should call getItemDetail with the correct ID and update state when executed', async () => {
    (getItemDetail as jest.Mock).mockResolvedValue(mockItemResponse);

    const { result } = renderHook(() => useGetDetail());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(getItemDetail).toHaveBeenCalledWith(mockItemId);
      expect(result.current.loading).toBe(false);
      expect(result.current.detail).toEqual(mockItem);
      expect(result.current.categories).toEqual(mockContext.categories);
    });
  });

  it('should handle error when getItemDetail fails', async () => {
    const mockError = new Error('getItemDetail failed');
    (getItemDetail as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useGetDetail());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(getItemDetail).toHaveBeenCalledWith(mockItemId);
      expect(result.current.loading).toBe(false);
      expect(result.current.detail).toEqual({});
      expect(result.current.categories).toEqual(mockContext.categories);
    });
  });
});
