import React from 'react';
import { Grid, ListItem, List } from '@material-ui/core';
import { Recipe } from '../components';

const testData = [
  {
    recipeName: '요리1',
    ingredients: '재료1, 재료2, 재료3 ...',
    views: 1,
    favorite: 0
  },
  {
    recipeName: '요리2',
    ingredients: '재료1, 재료2, 재료3 ...',
    views: 3,
    favorite: 1
  },
];
const Main = (props) => {
  const recipeList = (data) => {
    let result = [];
    data.map(element => {
      result.push(
        <ListItem>
          <Recipe 
            recipeName = { element.recipeName }
            ingredients = { element.ingredients }
            views = { element.views }
            favorite = { element.favorite }
          />
        </ListItem>
      );
    });
    return result;
  }
  return (
    <List>
      { recipeList(testData) }
    </List>
  )
}

export default Main;