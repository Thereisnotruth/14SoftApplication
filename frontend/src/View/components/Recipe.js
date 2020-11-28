import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axios from 'axios';

const Recipe = (props) => {
  const { recipeName, recipeId, ingredients, views } = props;
  const [favor, setFavor] = useState(props.favor);
  console.log(recipeId)
  const id = getCookie('access_cookie')
  console.log(id)
  function click() {
    if(favor === 0) { 
      axios.post('/v1/like', {
        userId: id,
        recipeId: recipeId
      })
      setFavor(1) 
    }
    else { 
      axios.post('/v1/unlike', {
        userId: id,
        recipeId: recipeId
      })
      setFavor(0) 
    }
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ')
        c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0)
        return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  const like = () => {
    if(favor === 1) {
      return (
        <Button onClick={click}>
          <FavoriteIcon className='favorite' />
        </Button>
      );
    } else {
      return (
        <Button onClick={click}>
          <FavoriteBorderIcon />
        </Button>
      )
    }
  }
  function redirect() {
    window.location.href = 'https://www.10000recipe.com/recipe/' + recipeId;
  }
  return(
      <Grid container className='recipe'>
          <Grid item xs={3}>{ like() }</Grid>
          <Grid item xs={6}>
          <Button onClick={redirect}>
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