// React
import React from 'react';
import PropTypes from 'prop-types';

//My components
import ListBooks from './ListBooks';

//Material UI
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

//My css
import './ListShelfs.css';

class ListShelfs extends React.Component {
  render() {
    const { shelfs, books, onUpdateBook } = this.props;

    return (
      <div>
        {shelfs.map(s => (
          <div key={s.key}>
            <Typography variant="h6" color="inherit">
              {s.text}
            </Typography>
            <Divider inset component="h6" />
            <ListBooks
              books={books.filter(b => b.shelf.includes(s.key))}
              shelfs={shelfs}
              onUpdateBook={onUpdateBook}
            />
            <br />
          </div>
        ))}
      </div>
    );
  }
}

ListShelfs.propTypes = {
  books: PropTypes.array.isRequired,
  shelfs: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired
};

export default ListShelfs;
