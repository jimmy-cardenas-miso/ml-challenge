import './breadcrumb.sass';

import { FC } from 'react';

type Props = {
  list: string[];
};

export const Breadcrumb: FC<Props> = ({ list }) => {
  if (!(list?.length > 0)) return <></>;

  return (
    <ul className="breadcrumb">
      {list.map((item: string) => (
        <li key={item}>
          <button>
            <span>{item}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
