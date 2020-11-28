import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, ListItem, Input, Button } from '@material-ui/core';
import './pages.css';
import { LoginModel } from '../../ViewModel';

const Login = ({history}) => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const changeUserId = (e) => {
    setUserId(e.target.value);
  };
  const changeUserPw = (e) => {
    setUserPw(e.target.value);
  };

  async function login() {
    const loginModel = new LoginModel(userId, userPw);
    const check = await loginModel.login();
    if (check !== undefined && check.status === 200) {
      alert('로그인 성공!')
      history.push('/main');
    }
  }
  return (
    <Grid container className='login_form'>
      <Grid className = "Box">
        <Input className = "Log"  type = "id" id='id' placeholder = "id를 입력하세요." onChange={changeUserId}></Input>
        <Input className = "Log" type = "password" id='pw' placeholder = "password을 입력하세요." onChange={changeUserPw}></Input>
        <Button class ="Log_B"variant="contained" onClick={login}>로그인</Button>
      </Grid>
      <ListItem className='Sign'>
        <Grid className='Sign_button'>
          <Link to={'/signup'}>
              회원가입
          </Link>
          </Grid>
      </ListItem>
    </Grid>
  );
}

export default Login;