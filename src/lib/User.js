class User{

  _currentUser = null;

  static setCurrentUser(user){
    this._currentUser = user;
  }

  static getCurrentUser(){
    return this._currentUser;
  }

  static clearCurrentUser(){
    this._currentUser = null;
  }
}

export default User;
