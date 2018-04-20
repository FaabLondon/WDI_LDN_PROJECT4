class User{

  _currentUser = null;

  static setCurrentUser(user){
    //use local storage
    this._currentUser = user || {}; //if undefined, set to {};
  }

  static getCurrentUser(){
    return this._currentUser;
  }

  static clearCurrentUser(){
    this._currentUser = null;
  }
}

export default User;
