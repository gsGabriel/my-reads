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
  card: {
    maxWidth: 200,
    margin: '15px 15px'
  },
  media: {
    height: 200
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
    const { classes } = this.props;

    const open = Boolean(anchorEl);
    return (
      <div>
        <GridList cols={6}>
          <GridListTile key={1} cols={2} rows={2}>
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
                title="Seja foda"
                titleTypographyProps={{
                  variant: 'subtitle1',
                  color: 'primary'
                }}
                subheader="Gabriel César"
              />
              <CardMedia
                className={classes.media}
                image="https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=9873991&qld=90&l=430&a=-1=1004474818"
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
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles)(ListBooks);
