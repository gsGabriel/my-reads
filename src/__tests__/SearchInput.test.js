import React from 'react';
import { shallow, mount } from '../enzyme';

import SearchInput from '../components/SearchInput';

describe('<SearchInput/>', () => {
  test('renders search input', () => {
    const updateQuery = jest.fn();
    const wrapper = shallow(<SearchInput onUpdateQuery={updateQuery} />);

    // Expect the wrapper object to be defined
    expect(wrapper.find('input')).toBeDefined();
  });

  test('trigger a update query function', () => {
    const query = 'query';
    const updateQuery = jest.fn();
    const wrapper = mount(<SearchInput onUpdateQuery={updateQuery} />);

    wrapper.find('input').simulate('change', query);

    // Expect the wrapper object to be defined
    expect(wrapper.find('input')).toBeDefined();

    // Expect the mock function called once time
    expect(updateQuery.mock.calls.length).toBe(1);
  });
});
