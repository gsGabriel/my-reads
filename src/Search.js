// React
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//My components
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';

//Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InputBase from '@material-ui/core/InputBase';

//My css
import './Search.css';

class Search extends React.Component {
  state = {
    books: []
  };

  /**
   * @description Search new books
   * @constructor
   * @param {string} query - The query for search
   * @param {array} myBooks - Current my books
   */
  searchBooks = (query, myBooks) => {
    if (query.length > 2) {
      BooksAPI.search(query).then(result => {
        if (result.error === undefined) {
          this.setState({
            books: result.map(b => {
              let myBook = myBooks.find(mb => {
                return mb.id === b.id;
              });

              if (myBook !== undefined) b = myBook;

              return b;
            })
          });
        }
      });
    }
  };

  render() {
    const { myBooks, shelfs, onAddBook, onUpdateBook } = this.props;
    const { books } = this.state;

    const updateMyBooks = (book, shelf) => {
      onAddBook(book);
      onUpdateBook(book, shelf);
    };

    return (
      <div>
        <AppBar position="fixed" color="inherit">
          <Toolbar>
            <Link to="/">
              <ArrowBackIcon fontSize="large" className="close-search" />
            </Link>
            <InputBase
              placeholder="Search by title or author"
              onChange={event =>
                this.searchBooks(event.currentTarget.value, myBooks)
              }
            />
          </Toolbar>
        </AppBar>
        <div className="content">
          <ListBooks
            books={books}
            shelfs={shelfs}
            onUpdateBook={updateMyBooks}
          />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  myBooks: PropTypes.array.isRequired,
  shelfs: PropTypes.array.isRequired,
  onAddBook: PropTypes.func.isRequired,
  onUpdateBook: PropTypes.func.isRequired
};

export default Search;
