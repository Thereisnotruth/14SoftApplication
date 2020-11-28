import React, { useState } from 'react';
import { Grid, Input, Button } from '@material-ui/core';
import './pages.css';
import { SignUpModel } from '../../ViewModel';

const SignUp = ({history}) => {
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [checkPw, setCheckPw] = useState('');
  const changeNickname = (e) => {
    setNickname(e.target.value)
  };

  const changeUserId = (e) => {
    setUserId(e.target.value)
  };

  const changeUserPw = (e) => {
    setUserPw(e.target.value)
  };

  const changeCheckPw = (e) => {
    setCheckPw(e.target.value)
  };
  
  async function signUp() {
    const signupModel = new SignUpModel(nickname, userId, userPw, checkPw);
    const check = await signupModel.postInfo();
    if (check !== undefined && check.status === 200) {
      alert('회원가입 완료')
      history.push('/login')
    }
  }
  return (
    <Grid container className='login_form'>
      <Grid className = "Box">
        <Grid container>
          <Grid item xs={6}>
            <h4>닉네임 :</h4>
          </Grid>
          <Grid item xs={6}>
            <Input className = "Log" id='nickname' placeholder = "닉네임을 입력하세요." onChange={changeNickname}></Input>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <h4>아이디 :</h4>
          </Grid>
          <Grid item xs={6}>
            <Input className='Log' id='userId'  placeholder = "아이디를 입력하세요." onChange={changeUserId}></Input>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <h4>비밀번호 :</h4>
          </Grid>
          <Grid item xs={6}>
            <Input className = "Log" type = "password" id='userPw'   placeholder = "password을 입력하세요." onChange={changeUserPw}></Input>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <h4>비밀번호 확인 :</h4>
          </Grid>
          <Grid item xs={6}>
            <Input className = "Log" type = "password" id='checkPw'  placeholder = "password확인" onChange={changeCheckPw}></Input>
          </Grid>
        </ Grid>
        <Button class ="Log_B" variant="contained" onClick={signUp}>회원가입</Button>
      </ Grid>
    </Grid>
  )
}

export default SignUp;