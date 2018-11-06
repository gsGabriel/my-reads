import React from 'react';
import { mount } from './enzyme';
import { MemoryRouter } from 'react-router';

import App from './App';

describe('<App/>', () => {
  test('renders app initial page', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
  });

  test('renders app search page', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <App />
      </MemoryRouter>
    );
  });
});
