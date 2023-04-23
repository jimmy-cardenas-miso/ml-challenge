import { FC } from 'react';

import './breadcrumb.sass';

type Props = {
  list: string[];
};

export const Breadcrumb: FC<Props> = ({ list }) => {
  if (!(list?.length > 0)) return <></>;

  return (
    <ul className="breadcrumb">
      {list.map((item: string) => (
        <li key={item}>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};
