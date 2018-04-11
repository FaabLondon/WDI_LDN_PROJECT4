import axios from 'axios';
import Auth from './Auth';

class User{

  _currentUser = null;

  static setCurrentUser(user){
    this._currentUser = user || {}; //if undefined, set to {};
  }

  static getCurrentUser(){
    //in case user refreshes the page and we lose the user instance, we need to make a new request to DB...
    if(this._currentUser) return this._currentUser;
    else {
      axios({
        method: 'GET',
        url: '/api/user',
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      })
        .then(res => this._currentUser = res.data)
        .catch(err => console.log(err.response.data.errors));
    }
    return this._currentUser;
  }

  static clearCurrentUser(){
    this._currentUser = null;
  }
}

export default User;
