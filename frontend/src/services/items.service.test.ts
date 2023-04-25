import { QueryResponse } from '../models/item-response.model';
import { axiosApi } from '../utilities/axiosApi';
import { getItems } from './items.service';

jest.mock('../utilities/axiosApi', () => ({
  axiosApi: {
    create: jest.fn(),
    get: jest.fn(),
  },
}));

describe('getItems', () => {
  const query = 'search query';
  const responseData: QueryResponse = {
    author: {
      name: 'Jimmy',
      lastname: 'Cardenas',
    },
    items: [
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
    ],
    categories: ['category 1', 'category 2'],
  };

  beforeEach(() => {
    (axiosApi.get as jest.Mock).mockResolvedValueOnce(
      Promise.resolve({ data: responseData }),
    );
  });

  it('should call axiosApi.get with correct query', async () => {
    await getItems(query);

    expect(axiosApi.get).toHaveBeenCalledWith(`?q=${query}`);
  });

  it('should return correct response data', async () => {
    const result: QueryResponse = await getItems(query);

    expect(result).toEqual(responseData);
  });
});
