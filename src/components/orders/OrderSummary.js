import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import User from '../../lib/User';
import _ from 'lodash';


class OrderSummary extends React.Component{

  state = {
    order: {},
    orderCleaned: [],
    nbItems: 0,
    pricePerDay: 0,
    SubTotal: 0
  }

  componentDidMount= () => {
    axios({
      method: 'GET',
      url: `/api/orders/${this.props.id}`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => {
        this.setState({order: res.data});
        this.prepareArray(res.data.orderList);
      });
  }

  prepareArray = (data) => {
    //generates array of unique Ids, then creates an array of object/items that counts how many times an item is in the shopping cart
    const uniqueIdArr = Array.from(new Set(data.map(item => item._id))).sort();
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

    //Update state to re-render
    this.setState({orderCleaned: newArrQtyId, nbItems, pricePerDay, SubTotal}, () => console.log(this.state));
  }


  render() {
    return (
      <section>
        <h3 className="subtitle is-size-3">Your order details</h3>
        <div className="columns is-multiline">
          <div className="column is-two-third">
            <h4 className="subtitle is-4">Order #{this.state.order._id}</h4>
            <h6 className="subtitle is-6 is-italic">Placed on {this.state.order.createdAt}</h6>
            <table className="table">
              <thead>
                <tr>
                  <th></th>
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
                      <div className="imgItemCart" style={{background: `url(${item.mainImage})`, backgroundSize: 'cover'}}>
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
                  <th>£{this.state.SubTotal} per day</th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="column is-one-third image">
            <h4 className="subtitle is-4">Delivery/Billing information</h4>
            <img src="https://i.pinimg.com/originals/53/08/f3/5308f3b73a0b83cf10b9b63adc15dc96.jpg" />
            <div>
              <h6 className="subtitle is-6"><strong>Delivery address</strong></h6>
              <p>{User.getCurrentUser() && User.getCurrentUser().name} {' '}
                {User.getCurrentUser() && User.getCurrentUser().lastName}</p>
              <p>{this.state.order.deliveryBillingAddress}</p>
              <p>{this.state.order.deliveryBillingPostcode}</p>
              <p>{this.state.order.deliveryBillingCity}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

// "deliveryBillingAddress": "4 tufton street",
// "deliveryBillingPostcode": "SW1P3QY",
// "deliveryBillingCity": "London",


export default OrderSummary;
