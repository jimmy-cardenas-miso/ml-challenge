import { Item } from './item.model';

export interface QueryResponse {
  author: {
    name: string;
    lastname: string;
  };
  categories: string[];
  items: Item[];
}
