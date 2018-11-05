import React from 'react';
import { mount } from '../enzyme';

import ListShelfs from '../components/ListShelfs';

describe('<ListShelfs/>', () => {
  test('renders list shelf', () => {
    const books = [];
    const shelfs = [
      { key: 'currentlyReading', text: 'Current Reading' },
      { key: 'wantToRead', text: 'Want to Read' },
      { key: 'read', text: 'Read' }
    ];
    const updateBook = jest.fn();

    const wrapper = mount(
      <ListShelfs books={books} shelfs={shelfs} onUpdateBook={updateBook} />
    );

    // Expect the wrapper div for a shelf to be defined
    shelfs.forEach(s => {
      expect(wrapper.find(`#${s.key}`)).toBeDefined();
    });

    // Expect the wrapper property is the same a mock
    expect(wrapper.prop('books')).toEqual(books);
    expect(wrapper.prop('shelfs')).toEqual(shelfs);
    expect(wrapper.prop('onUpdateBook')).toEqual(updateBook);
  });
});

describe('<ListShelfs/>', () => {
  test('renders list shelf with books', () => {
    const books = [{ id: 1, shelf: 'read' }];
    const shelfs = [
      { key: 'currentlyReading', text: 'Current Reading' },
      { key: 'wantToRead', text: 'Want to Read' },
      { key: 'read', text: 'Read' }
    ];
    const updateBook = jest.fn();

    const wrapper = mount(
      <ListShelfs books={books} shelfs={shelfs} onUpdateBook={updateBook} />
    );

    // Expect the wrapper div for a shelf to be defined
    shelfs.forEach(s => {
      expect(wrapper.find(`#${s.key}`)).toBeDefined();
    });
  });
});
