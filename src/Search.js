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

  searchBooks = (query) => {
    if(query.length > 2){
      BooksAPI.search(query).then(result => {
        if(result.error === undefined)
          this.setState({ books: result });
      });
    }
  }

  render() {
    const { myBooks, shelfs, onUpdateBook } = this.props
    const { books } = this.state

    return (
      <div>
        <AppBar position="fixed" color="inherit">
          <Toolbar>
            <Link to="/">
              <ArrowBackIcon fontSize="large" className="close-search" />
            </Link>
            <InputBase placeholder="Search by title or author" onChange={(event) => this.searchBooks(event.currentTarget.value)} />
          </Toolbar>
        </AppBar>
        <div className="content">
          <ListBooks
            books={books}
            shelfs={shelfs}
            onUpdateBook={onUpdateBook}
          />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  myBooks: PropTypes.array.isRequired,
  shelfs: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired
};

export default Search;
