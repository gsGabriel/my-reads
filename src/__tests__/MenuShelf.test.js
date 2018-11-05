import React from 'react';
import { mount } from '../enzyme';

import MenuShelf from '../components/MenuShelf';

describe('<MenuShelf/>', () => {
  test('renders shelf menu', () => {
    const book = {};
    const shelfs = [
      { key: 'currentlyReading', text: 'Current Reading' },
      { key: 'wantToRead', text: 'Want to Read' },
      { key: 'read', text: 'Read' }
    ];
    const updateBook = jest.fn();

    const wrapper = mount(
      <MenuShelf book={book} shelfs={shelfs} onUpdateBook={updateBook} />
    );

    // Expect the wrapper button to be defined
    expect(wrapper.find('button')).toBeDefined();
    // Expect the wrapper menu to be defined
    expect(wrapper.find('Menu')).toBeDefined();

    // Expect the wrapper property is the same a mock
    expect(wrapper.prop('book')).toEqual(book);
    expect(wrapper.prop('shelfs')).toEqual(shelfs);
    expect(wrapper.prop('onUpdateBook')).toEqual(updateBook);
  });

  test('trigger a update book function', () => {
    const book = {};
    const shelfs = [
      { key: 'currentlyReading', text: 'Current Reading' },
      { key: 'wantToRead', text: 'Want to Read' },
      { key: 'read', text: 'Read' }
    ];
    const updateBook = jest.fn();

    const wrapper = mount(
      <MenuShelf book={book} shelfs={shelfs} onUpdateBook={updateBook} />
    );

    wrapper.find('button').simulate('click');

    // Expect the menu item is equal of shelfs
    expect(wrapper.find('ListItem')).toHaveLength(shelfs.length);

    // Click on first item
    wrapper
      .find('ListItem')
      .first()
      .simulate('click');

    // Expect the mock function called once time
    expect(updateBook.mock.calls.length).toBe(1);
  });

  test('trigger a close menu function', () => {
    const book = {};
    const shelfs = [
      { key: 'currentlyReading', text: 'Current Reading' },
      { key: 'wantToRead', text: 'Want to Read' },
      { key: 'read', text: 'Read' }
    ];
    const updateBook = jest.fn();

    const wrapper = mount(
      <MenuShelf book={book} shelfs={shelfs} onUpdateBook={updateBook} />
    );

    wrapper.find('button').simulate('click');

    // Expect the menu item is equal of shelfs
    expect(wrapper.find('ListItem')).toHaveLength(shelfs.length);

    // Click on first item
    wrapper
      .find('#render-props-menu')
      .first()
      .simulate('mousedown');

    // Expect the mock function called once time
    expect(updateBook.mock.calls.length).toBe(0);
  });
});
