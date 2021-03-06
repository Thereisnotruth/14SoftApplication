import React, { useState, useEffect } from 'react';
import { Grid, ListItem, List } from '@material-ui/core';
import { MainModel } from '../../ViewModel';
import { Recipe } from '../components';

const Main = (props) => {
  const mainModel = new MainModel();
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const test = await mainModel.whatRecipeShouldBeSeen();
        console.log(test.data)
        setData(test.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);
    
  const recipeList = (data) => {
    let result = [];
    console.log(data);

    data.map(element => {
      result.push(
        <ListItem>
          <Recipe 
            recipeName = { element.recipeName }
            recipeId = { element.id }
            ingredients = { element.ingredients }
            views = { element.views }
          />
        </ListItem>
      );
    });
    return result;
  }
  return (
    <List>
      {isLoading?(
        <div className='loading'>
          Loading...
        </div>
      ): (
        recipeList(data)
      )
      }
    </List>
  )
}

export default Main;