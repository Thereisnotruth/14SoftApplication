import React, { useState, useEffect } from 'react';
import { Grid, Input, Button, List, ListItem } from '@material-ui/core';
import { SearchModel } from '../../ViewModel'
import { Recipe } from '../components';
const Search = () => {
  const [content, setContent] = useState('');
  const [re, setRe] = useState([]);

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  async function search() {
    const searchModel = new SearchModel(content);
    const prom = await searchModel.search();
    setRe(prom.data);
  }

  const showResult = () => {
    let result = [];

    re.map(element => {
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
    <Grid>
    {re.length === 0?
      <div className='search_form'>
        <Grid item>
          <Input className='input' onChange={changeContent}/>
          <Button variant="contained" onClick={search}>검색</Button>
      </Grid>
      </div>
    :
    <List>
      {showResult()}
    </List>
    }
    </Grid>
  )
}

export default Search;