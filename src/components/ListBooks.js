// React
import React from 'react';
import PropTypes from 'prop-types';

//My components
import MenuShelf from './MenuShelf';

//Material UI
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';

//My css

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    minHeight: 500
  },
  card: {
    width: 260,
    margin: '10px 3px'
  },
  cardHeader: {
    height: 80,
    margin: '10px 3px'
  },
  media: {
    height: 0,
    paddingTop: '125%'
  }
});

class ListBooks extends React.Component {
  state = {
    anchorEl: null
  };

  render() {
    const { classes, books, shelfs, onUpdateBook } = this.props;
    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={1}>
          {books.length > 0 ? (
            books.map(book => (
              <div key={book.id}>
                <GridListTile>
                  <Card className={classes.card} key={book.id}>
                    <CardHeader
                      className={classes.cardHeader}
                      action={
                        <MenuShelf
                          book={book}
                          shelfs={shelfs}
                          onUpdateBook={onUpdateBook}
                        />
                      }
                      title={book.title}
                      titleTypographyProps={{
                        variant: 'subtitle2',
                        color: 'primary'
                      }}
                      subheader={book.authors ? book.authors.join(', ') : ''}
                    />
                    <CardMedia
                      className={classes.media}
                      image={
                        book.imageLinks !== undefined
                          ? book.imageLinks.thumbnail.replace(
                              'zoom=1',
                              'zoom=0'
                            )
                          : 'http://books.google.com/books/content?id=sJf1vQAACAAJ&printsec=frontcover&img=1&zoom=0&source=gbs_api'
                      }
                      title={book.title}
                    />
                  </Card>
                </GridListTile>
              </div>
            ))
          ) : (
            <h3>No books available</h3>
          )}
        </GridList>
      </div>
    );
  }
}

ListBooks.propTypes = {
  classes: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  shelfs: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired
};

export default withStyles(styles)(ListBooks);
