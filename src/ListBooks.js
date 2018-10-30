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

const options = [ { key: 'currentlyReading', text: 'Current Reading'}, { key: 'wantToRead', text: 'Want to Read'}, { key: 'read', text: 'Read'}];

class ListBooks extends React.Component {
  state = {
    anchorEl: null
  };

  onMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  onMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes, books } = this.props;

    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <GridList className={classes.gridList}>
          {books.map(book => (
            <div>
              <GridListTile key={book.id}>
                <Card className={classes.card}>
                  <CardHeader
                    className={classes.cardHeader}
                    action={
                      <IconButton
                        aria-label="More"
                        aria-owns={open ? 'long-menu' : null}
                        aria-haspopup="true"
                        onClick={this.onMenuOpen}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
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
                    title="Contemplative Reptile"
                  />
                  <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.onMenuClose}
                    PaperProps={{
                      style: {
                        width: 150
                      }
                    }}
                  >
                    {options.map(option => (
                      <MenuItem
                        key={option.key}
                        selected={option.key == book.shelf}
                        onClick={this.onMenuClose}
                      >
                        {option.text}
                      </MenuItem>
                    ))}
                  </Menu>
                </Card>
              </GridListTile>
            </div>
          ))}
        </GridList>
      </div>
    );
  }
}

ListBooks.propTypes = {
  classes: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired
};

export default withStyles(styles)(ListBooks);
