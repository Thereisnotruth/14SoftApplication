import { UserModel } from '../Model';
class SignUpModel {
  constructor(nickname, userId, userPw, checkPw) {
    if (nickname === '') { 
      alert('닉네임을 입력해주세요.') 
      return 
    }
    if (userId === '') {
      alert('아이디를 입력해주세요.')
      return 
    }
    if (userPw === '') {
      alert('비밀번호를 입력해주세요.') 
      return
    }
    if (checkPw === '') {
      alert('비밀번호 확인을 입력해주세요.') 
      return 
    }
    if (userPw !== checkPw) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }
    this.user = new UserModel();
    this.user.setNickname(nickname);
    this.user.setUserId(userId);
    // 암호화 한다면 이곳에서 하겠지
    this.user.setUserPw(userPw);
  }

  postInfo() {
    if (this.user !== undefined) {
      return this.user.postInfo();
    }
  }
}

export default SignUpModel;