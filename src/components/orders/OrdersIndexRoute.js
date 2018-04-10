import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

// import Cart from '../../lib/Cart';
// import _ from 'lodash';

// const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class OrdersIndexRoute extends React.Component{

  state = {
    orders: []
  }

  componentDidMount= () => {
    axios({
      method: 'GET',
      url: '/api/orders',
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({orders: res.data}));
  }

  render() {
    return (
      <div className="columns">
        <div className="column is-two-thirds">
          <table className="table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Date</th>
                <th>Amout</th>
                <th>Status</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              {this.state.orders.map((order, i) =>
                <tr key={i} className="orderContent">
                  <td>{order._id}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.amount}£ per day</td>
                  <td>Processed</td>
                  <td><Link to={`/orders/${order._id}`}>Order details</Link></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="column is one-third">
          <img src="http://fashionlollipop.com/newsite/wp-content/uploads/2013/12/SloaneStreet.co_.uk2_.png" />
        </div>
      </div>
    );
  }
}

export default OrdersIndexRoute;
