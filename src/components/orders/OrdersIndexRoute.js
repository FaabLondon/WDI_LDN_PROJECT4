import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';
import '../../scss/components/ordersIndex.scss';

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
      <div>
        <div className="columns">
          <div className="column is-two-thirds" style={{overflowX: 'auto'}}>
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
                    <td>{order.createdAt.substring(0,10) }</td>
                    <td>{order.amount}£ per day</td>
                    <td>Processed</td>
                    <td><Link to={`/orders/${order._id}`}>Order details</Link></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="column is one-third">
            <div className="ordersIndexImg"></div>
          </div>
        </div>
        <Link to="/items" className="button">Back to browsing</Link>
      </div>
    );
  }
}

export default OrdersIndexRoute;
