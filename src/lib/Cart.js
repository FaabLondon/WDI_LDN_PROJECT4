class Cart{

  _currentCart = null;

  static setCart(cart){
    this._currentCart = cart || {}; //if undefined, set to {};
  }

  static getCart(){
    return this._currentCart;
  }

  static getnbItemsCart(){
    return this._currentCart.length;
  }

  //only works if cart is populated...otherwise only has item id in it
  static getnbItemCart(itemId){
    return this._currentCart.filter(elt => elt._id === itemId).length;
  }

  static clearCart(){
    this._currentCart = null;
  }
}

export default Cart;
