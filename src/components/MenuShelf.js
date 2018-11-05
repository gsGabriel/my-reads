// React
import React from 'react';
import PropTypes from 'prop-types';

//My components

//Material UI
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';

//My css
import './MenuShelf.css';

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

class MenuShelf extends React.Component {
  /**
   * @description Event on menu click
   * @constructor
   * @param {object} book - book to update
   * @param {string} shelf - new shelf to book
   * @param {func} onUpdateBook - book update callback
   */
  onMenuClick = (book, shelf, onUpdateBook) => {
    onUpdateBook(book, shelf);
  };

  render() {
    const { book, shelfs, onUpdateBook } = this.props;
    return (
      <WithState>
        {({ anchorEl, updateAnchorEl }) => {
          const open = Boolean(anchorEl);
          const handleClose = () => {
            updateAnchorEl(null);
          };

          return (
            <React.Fragment>
              <IconButton
                aria-owns={open ? 'render-props-menu' : undefined}
                aria-haspopup="true"
                onClick={event => {
                  updateAnchorEl(event.currentTarget);
                }}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
              <Menu
                id="render-props-menu"
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
                    onClick={() => {
                      this.onMenuClick(book, option.key, onUpdateBook);
                      handleClose();
                    }}
                  >
                    {option.text}
                  </MenuItem>
                ))}
              </Menu>
            </React.Fragment>
          );
        }}
      </WithState>
    );
  }
}

MenuShelf.propTypes = {
  book: PropTypes.object.isRequired,
  shelfs: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired
};

export default MenuShelf;
