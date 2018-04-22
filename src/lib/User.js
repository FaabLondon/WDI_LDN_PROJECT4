class User{

  // _currentUser = null;

  static setCurrentUser(user){
    //use local storage
    localStorage.setItem('user', JSON.stringify(user));
    // this._currentUser = user || {}; //if undefined, set to {};
  }

  static getCurrentUser(){
    // return this._currentUser;
    return JSON.parse(localStorage.getItem('user'));
  }

  static clearCurrentUser(){
    // this._currentUser = null;
    localStorage.setItem('user', null);
  }
}

export default User;
