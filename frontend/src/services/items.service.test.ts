import { getItemDetail, getItems } from './items.service';

describe('getItems', () => {
  it('should fetch and return items', async () => {
    const query = 'test';
    const mockData = {
      results: [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
      ],
    };
    const mockResponse = { json: jest.fn().mockResolvedValue(mockData) };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const result = await getItems(query);

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.VITA_BASE_URL}/api/items?q=${query}`,
    );
    expect(mockResponse.json).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  it('should throw an error if the fetch fails', async () => {
    const query = 'test';
    const mockError = new Error('Not found');
    const mockResponse = { statusText: 'Not found' };
    global.fetch = jest.fn().mockRejectedValue(mockResponse);

    await expect(getItems(query)).rejects.toThrow(mockError);
  });
});

describe('getItemDetail', () => {
  it('should fetch and return item detail', async () => {
    const id = '1';
    const mockData = { id: '1', name: 'Item 1' };
    const mockResponse = { json: jest.fn().mockResolvedValue(mockData) };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const result = await getItemDetail(id);

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.VITA_BASE_URL}/api/items/${id}`,
    );
    expect(mockResponse.json).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  it('should throw an error if the fetch fails', async () => {
    const id = '1';
    const mockError = new Error('Not found');
    const mockResponse = { statusText: 'Not found' };
    global.fetch = jest.fn().mockRejectedValue(mockResponse);

    await expect(getItemDetail(id)).rejects.toThrow(mockError);
  });
});
