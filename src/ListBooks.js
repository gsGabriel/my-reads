// React
import React from 'react';
import PropTypes from 'prop-types';

//My components

//Material UI
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';

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

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

class ListBooks extends React.Component {
  state = {
    anchorEl: null
  };

  /**
   * @description Event on menu click
   * @constructor
   * @param {object} book - book to update
   * @param {string} shelf - new shelf to book
   * @param {func} onUpdateBook - book update callback
   */
  onMenuClick = (book, shelf, onUpdateBook) => {
    onUpdateBook(book, shelf);

    this.setState({ anchorEl: null });
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
                        <WithState>
                          {({ anchorEl, updateAnchorEl }) => {
                            const open = Boolean(anchorEl);
                            const handleClose = () => {
                              updateAnchorEl(null);
                            };

                            return (
                              <React.Fragment>
                                <IconButton
                                  aria-owns={
                                    open ? 'render-props-menu' : undefined
                                  }
                                  aria-haspopup="true"
                                  onClick={event => {
                                    updateAnchorEl(event.currentTarget);
                                  }}
                                >
                                  <MoreVertIcon fontSize="small" />
                                </IconButton>
                                <Menu
                                  iid="render-props-menu"
                                  anchorEl={anchorEl}
                                  open={open}
                                  onClose={handleClose}
                                  PaperProps={{
                                    style: {
                                      width: 150
                                    }
                                  }}
                                >
                                  {shelfs.map(option => (
                                    <MenuItem
                                      key={option.key}
                                      selected={option.key === book.shelf}
                                      onClick={() =>
                                        this.onMenuClick(
                                          book,
                                          option.key,
                                          onUpdateBook
                                        )
                                      }
                                    >
                                      {option.text}
                                    </MenuItem>
                                  ))}
                                </Menu>
                              </React.Fragment>
                            );
                          }}
                        </WithState>
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
                      image={book.imageLinks.thumbnail.replace(
                        'zoom=1',
                        'zoom=0'
                      )}
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
