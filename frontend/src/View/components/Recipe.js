import React from 'react';
import { Grid, Button } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const Recipe = (props) => {
  const { recipeName, ingredients, views, favorite } = props;

  const favor = () => {
    if(favorite === 1) {
      return (
        <Button>
          <FavoriteIcon className='favorite' />
        </Button>
      );
    } else {
      return (
        <Button>
          <FavoriteBorderIcon />
        </Button>
      )
    }
  }
  return(
      <Grid container className='recipe'>
          <Grid item xs={3}>{ favor() }</Grid>
          <Grid item xs={6}>
          <Button>
            <Grid container>
              <Grid item xs={12}>{ recipeName }</Grid>
              <Grid item xs={12}>{ ingredients }</Grid>
              <Grid item xs={12}>조회수: { views }</Grid>
            </Grid>
            </Button>
          </Grid>
      </Grid>
  );
}

export default Recipe;