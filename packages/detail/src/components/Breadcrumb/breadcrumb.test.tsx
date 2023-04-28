import { render } from '@testing-library/react';
import React from 'react';

import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  it('should render nothing if list is empty', () => {
    const { container } = render(<Breadcrumb list={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render a breadcrumb with items', () => {
    const list = ['Home', 'About', 'Contact'];
    const { container } = render(<Breadcrumb list={list} />);
    const items = container.querySelectorAll('.breadcrumb li');
    expect(items.length).toBe(list.length);
    items.forEach((item, index) => {
      expect(item.textContent).toBe(list[index]);
    });
  });
});
