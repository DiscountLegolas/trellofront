const API_URL = "https://localhost:7254/api/Account/";

class AuthService {
  login(email, pass) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eMail: email,
        password: pass
      })
    };
    return  fetch((API_URL + "Login"),requestOptions);
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, pass) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: username,
        email: email,
        password: pass
      })
    };
    return fetch((API_URL + "User"),requestOptions);
  }

  getCurrentUser() {
    let date=new Date()
    const user=localStorage.getItem("user");
    if (user) {
      let juser=JSON.parse(user)
      let date2=new Date(juser.experation)
      if(date>date2){
        return null
      }
      return juser
    }
    return null;
  }
}

export default new AuthService();