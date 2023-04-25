import { renderHook } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { searchItems } from '../store/slices/search';
import { useGetItems } from './useGetItems';

jest.mock('react-router-dom', () => ({
  useSearchParams: jest
    .fn()
    .mockReturnValue([new URLSearchParams({ search: 'ASD' })]),
}));

jest.mock('../store/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../store/slices/search', () => ({
  searchItems: jest.fn(),
  selectSearch: jest.fn(),
}));

describe('useGetItems', () => {
  const searchQuery = 'search query';
  const mockSearchParams = [new URLSearchParams({ search: searchQuery })];

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
    (useAppSelector as jest.Mock).mockReturnValue({
      loading: false,
      items: [{ id: 1, name: 'item 1' }],
      categories: ['category 1', 'category 2'],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call searchItems with correct query', () => {
    renderHook(() => useGetItems());

    expect(searchItems).toHaveBeenCalledWith(searchQuery);
  });

  it('should return correct loading, items, and categories', () => {
    const { result } = renderHook(() => useGetItems());

    expect(result.current.loading).toBe(false);
    expect(result.current.items).toEqual([{ id: 1, name: 'item 1' }]);
    expect(result.current.categories).toEqual(['category 1', 'category 2']);
  });
});
