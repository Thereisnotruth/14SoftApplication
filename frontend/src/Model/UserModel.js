import axios from 'axios';

class UserModel {
  constructor() {
    this.nickname = '';
    this.userId = '';
    this.userPw = '';
  }
  setNickname(nickname) {
    this.nickname = nickname;
  }
  setUserId(userId) {
    this.userId = userId;
  }
  setUserPw(userPw) {
    this.userPw = userPw;
  }
  postInfo() {
    const check = axios.post('/v1/signup', {
      nickname: this.nickname,
      userId: this.userId,
      userPw: this.userPw
    }).catch(() => {
      alert('오류가 발생했습니다.');
    });
    return check;
  }
  login() {
    const check = axios.post('/v1/login', {
      userId: this.userId,
      userPw: this.userPw
    }).catch(() => {
      alert('오류가 발생했습니다.');
    })
    return check;
  }
}

export default UserModel;