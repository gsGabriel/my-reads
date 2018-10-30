// React
import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//My components
import Search from './Search';
import SearchInput from './SearchInput';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';

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

const shelfs = [ { key: 'currentlyReading', text: 'Current Reading'}, { key: 'wantToRead', text: 'Want to Read'}, { key: 'read', text: 'Read'}];
class App extends React.Component {
  state = {
    books: [],
    query: ''
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  }

  updateBook = (book, shelf) => {
    this.setState((currentState) => ({
      books: currentState.books.filter((b) => {
        if(b.id === book.id){
          b.shelf = shelf
        }

        return b;
      })
    }))

    BooksAPI.update(book, shelf)
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }

  render() {
    const { query, books } = this.state
    const { classes } = this.props;

    const showingBooks = query === ''
    ? books
    : books.filter((b) => (
        b.title.toLowerCase().includes(query.toLowerCase()) || (b.authors ? b.authors.join(', ') : '').toLowerCase().includes(query.toLowerCase())
      ))

    return (
      <div>
        <Route
          path="/search"
          render={() => <Search myBooks={this.state.Books} />}
        />
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
                  <SearchInput onUpdateQuery={this.updateQuery}/>
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
               {shelfs.map((s) => (
                  <div key={s.key}>
                    <Typography variant="h6" color="inherit">
                      {s.text}
                    </Typography>
                    <Divider inset component="h6" />
                    <ListBooks
                      books={showingBooks.filter(b =>
                        b.shelf.includes(s.key)
                      )}
                      shelfs={shelfs}
                      onUpdateBook={this.updateBook}
                    />
                    <br />
                  </div>
               ))}
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
