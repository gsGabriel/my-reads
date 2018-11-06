import React from 'react';
import { mount } from '../enzyme';

import ListBooks from '../components/ListBooks';

describe('<ListBooks/>', () => {
  test('renders list books without books', () => {
    const books = [];
    const shelfs = [
      { key: 'currentlyReading', text: 'Current Reading' },
      { key: 'wantToRead', text: 'Want to Read' },
      { key: 'read', text: 'Read' }
    ];
    const updateBook = jest.fn();

    const wrapper = mount(
      <ListBooks books={books} shelfs={shelfs} onUpdateBook={updateBook} />
    );

    // Expect the wrapper h3 of without books to be defined
    expect(wrapper.find('h3')).toBeDefined();

    // Expect the wrapper property is the same a mock
    expect(wrapper.prop('books')).toEqual(books);
    expect(wrapper.prop('shelfs')).toEqual(shelfs);
    expect(wrapper.prop('onUpdateBook')).toEqual(updateBook);
  });

  test('renders list books with books', () => {
    const books = [
      {
        id: 1,
        authors: ['Gabriel'],
        imageLinks: {
          thumbnail:
            'http://books.google.com/books/content?id=sJf1vQAACAAJ&printsec=frontcover&img=1&zoom=0&source=gbs_api'
        }
      }
    ];
    const shelfs = [
      { key: 'currentlyReading', text: 'Current Reading' },
      { key: 'wantToRead', text: 'Want to Read' },
      { key: 'read', text: 'Read' }
    ];
    const updateBook = jest.fn();

    const wrapper = mount(
      <ListBooks books={books} shelfs={shelfs} onUpdateBook={updateBook} />
    );

    // Expect the wrapper ul of books to be defined
    expect(wrapper.find('ul')).toBeDefined();
  });
});
