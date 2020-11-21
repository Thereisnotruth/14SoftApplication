import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, List, ListItem } from '@material-ui/core';
import './pages.css';

const User = () => {
  return (
    <List>
      <ListItem className='user'>
        <Grid className='login_button'>
          <Link to={'/login'}>
              로그인
            
          </Link>
          </Grid>
      </ListItem>
      <ListItem className='user'>
        <Link to={'/favor'} className='see_favor_button'>
            <Grid>
              좋아요 누른 레시피
            </Grid>
        </Link>
      </ListItem>
    </List>
  )
}

export default User;