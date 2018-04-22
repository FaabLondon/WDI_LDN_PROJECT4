import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Cart from '../../lib/Cart';

import '../../scss/components/showCartRoute.scss';
import prepareArray from '../../lib/prepareArray';
import calcCartContent from '../../lib/calcCartContent';

class CartSummary extends React.Component{

  state = {
    items: [],
    nbItems: 0,
    pricePerDay: 0,
    subTotal: 0
  }

  updateCart = (data) => {
    //prepare array and calc prices for each item, subTotal etc
    const newArrQtyId = prepareArray(data);
    const cartContent = calcCartContent(newArrQtyId);
    if (this.props.updateNbItems) this.props.updateNbItems(data.length);
    if (this.props.updateOrderTotal) this.props.updateOrderTotal(cartContent.subTotal);
    // set Cart
    Cart.setCart(data);
    this.setState({
      items: newArrQtyId,
      nbItems: data.length,
      ...cartContent
    });

  }

  componentDidMount= () => {
    axios({
      method: 'GET',
      url: '/api/cart',
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.updateCart(res.data));
  }

  handleAddCart = (itemId) => {
    axios({
      method: 'POST',
      url: `/api/cart/items/${itemId}`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.updateCart(res.data));
  }

  handleDeleteCart = (itemId) => {
    axios({
      method: 'DELETE',
      url: `/api/cart/items/${itemId}`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.updateCart(res.data));
  }

  render() {
    return (
      <table className="table">
        <thead>
          {/* Header of the cart */}
          <tr>
            <th></th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Rental price</th>
            <th>SubTotal</th>
            <th>Delivery Options</th>
          </tr>
        </thead>
        <tbody>
          {/* Content of the cart */}
          {this.state.items.map((item, i) =>
            <tr key={i} className="cartContent">
              <th>
                <div className="imgItemCart" style={{backgroundImage: `url(${item.mainImage})`}}>
                </div>
              </th>
              <td>
                <h6 className="title is-size-6">{item.brand}</h6>
                <h6 className="subtitle is-size-7">{item.shortDescription}</h6>
                <h6 className="subtitle is-size-7">Size: {item.sizeAvailable}</h6>
              </td>
              <td>
                <p><strong>{item.qty} items</strong></p>
                <button type="button" onClick={() => this.handleDeleteCart(item._id)} className="button">-</button>
                <button type="button" onClick={() => this.handleAddCart(item._id)} className="button">+</button>
              </td>
              <td>£{item.rentalPrice} per day</td>
              <td>£{item.rentalPrice * item.qty} per day</td>
              <td>
                <h6 className="title is-size-6"><span><i className="fas fa-truck"></i></span> Delivery to UK</h6>
                <h6 className="title is-size-6 has-text-grey"><span><i className="fas fa-arrow-alt-circle-right"></i></span> Click & Collect</h6>
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          {/* Footer of the cart */}
          <tr>
            <th></th>
            <th></th>
            <th>{this.state.nbItems} items</th>
            <th>£{this.state.pricePerDay} per day</th>
            <th>£{this.state.subTotal} per day</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default CartSummary;
