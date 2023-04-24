import React, { FC, useContext, useState } from 'react';

import { ItemContext } from './Item.Context';

type Props = {
  children: React.ReactElement;
};
export const ItemProvider: FC<Props> = ({ children }) => {
  const [categories, setCategories] = useState([] as string[]);

  return (
    <ItemContext.Provider value={{ categories, setCategories }}>
      {children}
    </ItemContext.Provider>
  );
};

export const usePokemonContext = () => useContext(ItemContext);
