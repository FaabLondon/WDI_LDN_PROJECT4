class Cart{

  _currentCart = null; //not needed if use local storage


  static setCart(cart){
    // localStorage.setItem('cart', JSON.stringify(cart));
    this._currentCart = cart || {}; //if undefined, set to {};
  }

  static getCart(){
    // return JSON.parse(localStorage.getItem('cart'));
    return this._currentCart;
  }

  //not useful - jut do a .lenght in the code
  static getnbItemsCart(){
    return this._currentCart.length;
  }

  //rename - get ItemsById - then use length in your code.
  //only works if cart is populated...otherwise only has item id in it
  static getnbItemCart(itemId){
    return this._currentCart.filter(elt => elt._id === itemId).length;
  }

  static clearCart(){
    this._currentCart = null;
  }
}

export default Cart;
