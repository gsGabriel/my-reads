// React
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//My components

//Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InputBase from '@material-ui/core/InputBase';

//My css
import './Search.css';

class Search extends React.Component {
  render() {
    return (
      <div>
        <AppBar position="fixed" color="inherit">
          <Toolbar>
            <Link to="/">
              <ArrowBackIcon fontSize="large" className="close-search" />
            </Link>
            <InputBase placeholder="Search by title or author" />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Search;
