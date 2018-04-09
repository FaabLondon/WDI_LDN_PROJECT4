import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Cart from '../../lib/Cart';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import '../../scss/components/showCartRoute.scss';

class ShowCartRoute extends React.Component{

  state = {
    items: [],
    nbItems: 0,
    pricePerDay: 0,
    SubTotal: 0
  }

  prepareArray = (data) => {
    //generates array of unique Ids
    const uniqueIdArr = Array.from(new Set(data.map(item => item._id))).sort();
    //Then creates an array of object/items that counts how many times an item is in the shopping cart and adds it to res.data in new object --> move to server side?
    const newArrQtyId = uniqueIdArr.map(elt => {
      const qtyId = _.filter(data, item => item._id === elt ).length;
      const foundElt = data.find(item => item._id === elt);
      return Object.assign({}, {qty: qtyId }, foundElt );
    });
    //calculates total nb of items in cart
    const nbItems = data.length;
    //calculate price per day
    const pricePerDay = newArrQtyId.reduce((acc, elt) => acc += elt.rentalPrice, 0);
    //calculate SubTotal
    const SubTotal = newArrQtyId.reduce((acc, elt) => acc = acc + (elt.rentalPrice * elt.qty), 0);
    Cart.setCart(data); //should not have to do that as if no <a>, no page reload
    this.setState({items: newArrQtyId, nbItems, pricePerDay, SubTotal}, () => console.log(this.state));
  }

  componentDidMount= () => {
    axios({
      method: 'GET',
      url: '/api/cart',
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.prepareArray(res.data));
  }

  handleAddCart = (itemId) => {
    axios({
      method: 'POST',
      url: `/api/cart/items/${itemId}`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.prepareArray(res.data));
  }

  handleDeleteCart = (itemId) => {
    axios({
      method: 'DELETE',
      url: `/api/cart/items/${itemId}`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.prepareArray(res.data));
  }

  render() {
    return (
      <section>
        <div className="columns is-multiline">
          <div className="column is-two-third">
            <h3 className="title is-size-3">Your shopping bag <span><i className="fas fa-shopping-bag fa-1x"></i></span></h3>

            <table className="table">
              <thead>
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
                {this.state.items.map((item, i) =>
                  <tr key={i} className="cartContent">
                    <th>
                      <div className="imgItemCart" style={{background: `url(${item.mainImage})`, backgroundSize: 'cover'}}>
                      </div>
                    </th>
                    <td>
                      <h6 className="title is-size-6">{item.brand}</h6>
                      <h6 className="subtitle is-size-7">{item.shortDescription}</h6>
                      <h6 className="subtitle is-size-7">Size: {item.sizeAvailable}</h6>
                    </td>
                    <td>{item.qty}
                      <button onClick={() => this.handleDeleteCart(item._id)} className="button">-</button>
                      <button onClick={() => this.handleAddCart(item._id)} className="button">+</button>
                    </td>
                    <td>£{item.rentalPrice} per day</td>
                    <td>£{item.rentalPrice} per day</td>
                    <td>
                      <h6 className="title is-size-6"><span><i className="fas fa-truck"></i></span>Delivery to UK</h6>
                      <h6 className="title is-size-6"><span><i className="fas fa-arrow-alt-circle-right"></i></span>Click & Collect</h6>
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <th></th>
                  <th>{this.state.nbItems} items</th>
                  <th>£{this.state.pricePerDay} per day</th>
                  <th>£{this.state.SubTotal} per day</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
            <Link to="/checkout" className="button">Proceed to checkout</Link>
            <Link to="/items" className="button">Keep shopping</Link>
          </div>
          <div className="column is-one-third image">
            <div className="imgRight"></div>
          </div>
        </div>
      </section>
    );
  }
}

export default ShowCartRoute;
