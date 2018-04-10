import React from 'react';
import { Link } from 'react-router-dom';
import OrderSummary from './OrderSummary';

class OrderShowRoute extends React.Component{

  render() {
    return (
      <section>
        <OrderSummary id={this.props.match.params.id}/>
        <Link to="/orders" className="button">Back to your Order history</Link>
      </section>
    );
  }
}

export default OrderShowRoute;
