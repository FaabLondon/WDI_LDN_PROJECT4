import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import User from '../../lib/User';
import '../../scss/components/orderSummary.scss';
import prepareArray from '../../lib/prepareArray';
import calcCartContent from '../../lib/calcCartContent';

//display order summary

class OrderSummary extends React.Component{

  state = {
    order: {
      createdAt: ''
    },
    orderCleaned: [],
    nbItems: 0,
    pricePerDay: 0,
    subTotal: 0
  }

  componentDidMount= () => {
    axios({
      method: 'GET',
      url: `/api/orders/${this.props.id}`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => {
        const newArrQtyId = prepareArray(res.data.orderList);
        const cartContent = calcCartContent(newArrQtyId);
        this.setState({
          order: res.data,
          orderCleaned: newArrQtyId,
          nbItems: res.data.orderList.length,
          ...cartContent
        });
      });

  }

  render() {
    return (
      <section>
        <h3 className="subtitle is-size-3">Your order details</h3>
        <div className="columns is-multiline">
          <div className="column is-two-third">
            <h4 className="subtitle is-4">Order <strong>#{this.state.order._id}</strong></h4>
            <h6 className="subtitle is-6 is-italic"><strong>Placed on {this.state.order.createdAt.substring(0,10) }</strong></h6>
            <table className="table">
              <thead>
                <tr>
                  <th>Item image</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Rental price</th>
                  <th>SubTotal</th>
                </tr>
              </thead>
              <tbody>
                {this.state.orderCleaned.map((item, i) =>
                  <tr key={i} className="cartContent">
                    <th>
                      <div className="imgItemCart" style={{backgroundImage: `url(${item.mainImage})`, backgroundSize: 'cover'}}>
                      </div>
                    </th>
                    <td>
                      <h6 className="title is-size-6">{item.brand}</h6>
                      <h6 className="subtitle is-size-7">{item.shortDescription}</h6>
                      <h6 className="subtitle is-size-7">Size: {item.sizeAvailable}</h6>
                    </td>
                    <td>
                      {item.qty}
                    </td>
                    <td>£{item.rentalPrice} per day</td>
                    <td>£{item.rentalPrice * item.qty} per day</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <th></th>
                  <th>{this.state.nbItems} items</th>
                  <th>£{this.state.pricePerDay} per day</th>
                  <th>£{this.state.subTotal} per day</th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="column is-one-third image">
            <h4 className="subtitle is-4">Delivery information</h4>
            <img src="https://i.pinimg.com/originals/53/08/f3/5308f3b73a0b83cf10b9b63adc15dc96.jpg" />
            <div>
              <strong><h6 className="subtitle is-6 delivery">Delivery address</h6></strong>
              {User.getCurrentUser() && User.getCurrentUser().name} {' '}
              {User.getCurrentUser() && User.getCurrentUser().lastName}
              <p>{this.state.order.deliveryBillingAddress}{' '}{this.state.order.deliveryBillingPostcode}{' '}{this.state.order.deliveryBillingCity}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}


export default OrderSummary;
