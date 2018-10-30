// React
import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//My components
import Search from './Search';
import SearchInput from './SearchInput';
import ListBooks from './ListBooks';

//Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

//My css
import './App.css';

const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  content: {
    width: '85%',
    margin: '80px auto'
  },
  grow: {
    flexGrow: 12
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    color: theme.palette.primary.dark
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Route path="/search" component={Search} />
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <AppBar position="fixed" color="inherit">
                <Toolbar>
                  <Typography
                    className={classes.title}
                    variant="h6"
                    color="inherit"
                    noWrap
                  >
                    My Reads
                  </Typography>
                  <SearchInput />
                </Toolbar>
              </AppBar>
              <Tooltip title="Add">
                <Button
                  variant="fab"
                  color="primary"
                  aria-label="Add"
                  className={classes.fab}
                  component={Link}
                  to="/search"
                >
                  <AddIcon />
                </Button>
              </Tooltip>
              <div className={classes.content}>
                <Typography variant="h6" color="inherit">
                  Current Reading
                </Typography>
                <Divider inset component="h6" />
                <ListBooks />
                <Typography variant="h6" color="inherit">
                  Want to Read
                </Typography>
                <Divider inset component="h6" />
                <ListBooks />
                <Typography variant="h6" color="inherit">
                  Read
                </Typography>
                <Divider inset component="h6" />
                <ListBooks />
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
