import React from 'react';
import { mount } from './enzyme';

import App from './App';

describe('<App/>', () => {
  test('renders app', () => {
    const wrapper = mount(<App />);
  });
});
