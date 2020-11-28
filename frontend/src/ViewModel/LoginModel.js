import { UserModel } from '../Model';

class LoginModel {
  constructor(userId, userPw) {
    if (userId === '') {
      alert('아이디를 입력해주세요.')
      return 
    }
    if (userPw === '') {
      alert('비밀번호를 입력해주세요.') 
      return
    }

    this.user = new UserModel();
    this.user.setUserId(userId);
    // 암호화 한다면 이곳에서 하겠지
    this.user.setUserPw(userPw);
  }

  login() {
    console.log(this.user)
    if (this.user !== undefined) {
      return this.user.login();
    }
  }
}

export default LoginModel;