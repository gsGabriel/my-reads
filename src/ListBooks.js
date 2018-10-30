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

const options = ['Current Reading', 'Want to Read', 'Read'];

class ListBooks extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
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
                        onClick={this.handleClick}
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
                    onClose={this.handleClose}
                    PaperProps={{
                      style: {
                        width: 200
                      }
                    }}
                  >
                    {options.map(option => (
                      <MenuItem
                        key={option}
                        selected={option === 'Pyxis'}
                        onClick={this.handleClose}
                      >
                        {option}
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

export default withStyles(styles)(ListBooks);
