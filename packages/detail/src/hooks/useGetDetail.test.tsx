import { renderHook } from '@testing-library/react-hooks';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { searchItemDetail } from '../store/slices/detail';
import { useGetDetail } from './useGetDetail';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('../store/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../store/slices/detail', () => ({
  searchItemDetail: jest.fn(),
  selectDetail: jest.fn(),
}));

describe('useGetDetail', () => {
  const id = '123';

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id });
    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
    (useAppSelector as jest.Mock).mockReturnValue({
      loading: false,
      detail: { id: 123, name: 'item 1' },
      categories: ['category 1', 'category 2'],
    });
  });

  it('should call searchItemDetail with correct id', () => {
    renderHook(() => useGetDetail());

    expect(searchItemDetail).toHaveBeenCalledWith(id);
  });

  it('should return correct loading, detail, and categories', () => {
    const { result } = renderHook(() => useGetDetail());

    expect(result.current.loading).toBe(false);
    expect(result.current.detail).toEqual({ id: 123, name: 'item 1' });
    expect(result.current.categories).toEqual(['category 1', 'category 2']);
  });
});
