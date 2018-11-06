import React from 'react';
import { mount } from '../enzyme';
import { MemoryRouter } from 'react-router';

import Search from '../components/Search';

describe('<Search/>', () => {
  test('renders search', () => {
    const books = [{}];
    const shelfs = [
      { key: 'currentlyReading', text: 'Current Reading' },
      { key: 'wantToRead', text: 'Want to Read' },
      { key: 'read', text: 'Read' }
    ];
    const addBook = jest.fn();
    const updateBook = jest.fn();

    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <Search
          myBooks={books}
          shelfs={shelfs}
          onAddBook={addBook}
          onUpdateBook={updateBook}
        />
      </MemoryRouter>
    );

    // Expect the wrapper object to be defined
    expect(wrapper.find('Search')).toBeDefined();

    // Expect the wrapper property is the same a mock
    expect(wrapper.find('Search').prop('myBooks')).toEqual(books);
    expect(wrapper.find('Search').prop('shelfs')).toEqual(shelfs);
    expect(wrapper.find('Search').prop('onAddBook')).toEqual(addBook);
    expect(wrapper.find('Search').prop('onUpdateBook')).toEqual(updateBook);
  });

  test('trigger a search function', () => {
    const query = 'query';
    const books = [{}];
    const shelfs = [
      { key: 'currentlyReading', text: 'Current Reading' },
      { key: 'wantToRead', text: 'Want to Read' },
      { key: 'read', text: 'Read' }
    ];
    const addBook = jest.fn();
    const updateBook = jest.fn();

    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <Search
          myBooks={books}
          shelfs={shelfs}
          onAddBook={addBook}
          onUpdateBook={updateBook}
        />
      </MemoryRouter>
    );

    wrapper
      .find('Search')
      .find('input')
      .simulate('change', query);
  });
});
