import React, { useState, useEffect } from 'react';
import { Grid, Input, Button, List, ListItem } from '@material-ui/core';
import { FavorModel } from '../../ViewModel'
import { Recipe } from '../components';
const Favor = () => {
  const [favor, setFavor] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const favorModel = new FavorModel();
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const test = await favorModel.getFavorRecipe();
        console.log(test.data)
        setFavor(test.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);
  const showResult = (data) => {
    let result = [];

    data.map(element => {
      result.push(
        <ListItem>
          <Recipe 
            recipeName = { element.recipeName }
            recipeId = { element.id }
            ingredients = { element.ingredients }
            views = { element.views }
            favor = { 1 }
          />
        </ListItem>
      );
    });
    return result;
  }

  return (
    <Grid>
      <List>
      {isLoading?(
        <div className='loading'>
          Loading...
        </div>
      ): (
        showResult(favor)
      )
      }
      </List>
    </Grid>
  )
}

export default Favor;