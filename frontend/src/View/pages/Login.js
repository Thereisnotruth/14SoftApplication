import React from 'react';
import { Grid, ListItem, List } from '@material-ui/core';
import { Recipe } from '../components';

const Login = () => {
  return (
    <Grid container clssName='login_form'>
      <Grid item xs={12} id='lo'>
        아이디 : 
      </Grid>
      <Grid item xs={12} id='lo'>
        비밀번호 : 
      </Grid>
      <Grid item xs={12} id='lo'>
        로그인
      </Grid>
      <Grid item xs={12} id='lo'>
        회원가입
      </Grid>
    </Grid>
  )
}

export default Login;