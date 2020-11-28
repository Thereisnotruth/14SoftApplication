import axios from 'axios';

class UserModel {
  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ')
        c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0)
        return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  

  setCookie(name, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
  }
  
  getIsLogin() {
    const check = this.getCookie('access_cookie');
    if (check !== null) {
      this.isLogin = 1;
    } else {
      this.isLogin = 0;
    }
    return this.isLogin;
  }
  logout() {
    axios.post('/v1/logout').catch(() => {
      alert('오류가 발생했습니다.');
    })
  }
}

export default UserModel