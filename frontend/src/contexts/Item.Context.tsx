import { createContext, Dispatch, SetStateAction } from 'react';

export interface PokemonProps {
  categories: string[];
  setCategories: Dispatch<SetStateAction<string[]>>;
}

export const ItemContext = createContext({} as PokemonProps);
