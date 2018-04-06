class Flash{
  
  //_ is convention for private as can't do private in JS
  _messages = null;

  //class method (static) instead of instantiated method
  static setMessage(type, message){
    this._messages = this._messages || {}; //if undefined, set to {}
    this._messages[type] = message;
  }

  static getMessages(){
    return this._messages;
  }

  static clearMessages(){
    this._messages = null;
  }
}

export default Flash;

//Static method calls are made directly on the class and are not callable on instances of the class. Static methods are often used to create utility functions.
//so can be called Flash.getMessages(); in a singleton as only need one instance of the class in my app
//instead of const flash = new Flash();
//flash.getMessage();
