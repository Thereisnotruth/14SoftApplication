import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, ListItem, Button } from '@material-ui/core';
import { UserModel } from '../../ViewModel';
import './pages.css';

const User = ({history}) => {
  const userModel = new UserModel();

  const logout = () => {
    userModel.logout()
    history.push('/main');
  }

  return (
    <List>
      {
        userModel.getIsLogin() === 0?
          <ListItem className='user'>
            <Grid className='login_button'>
              <Link to={'/login'}>
                  로그인
              </Link>
            </Grid>
          </ListItem>
        : 
        <ListItem className='user'>
          <Grid container>
            <Button className='logout_button' onClick={logout}>
              로그아웃
            </Button>
          </Grid>
        </ListItem>
      }
      <ListItem className='user'>
        <Grid container>
          <Link to={'/favor'} className='see_favor_button'>
              좋아요 누른 레시피
          </Link>
        </Grid>
      </ListItem>
    </List>
  )
}

export default User;