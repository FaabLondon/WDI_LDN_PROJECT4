import React from 'react';
import { Link } from 'react-router-dom';
import CartSummary from './CartSummary';

import '../../scss/components/showCartRoute.scss';

class ShowCartRoute extends React.Component{

  state = {
    items: [],
    nbItems: 0
  }

  updateNbItems = (nbItems) => {
    this.setState({nbItems: nbItems });
  }

  render() {
    return (
      <section>
        <div className="columns is-multiline">
          <div className="column is-two-third">
            <h3 className="title is-size-3">Your shopping bag <span><i className="fas fa-shopping-bag fa-1x"></i></span></h3>

            <CartSummary updateNbItems={this.updateNbItems}/>

            {this.state.nbItems > 0 && <Link to="/checkout" className="button">Proceed to checkout</Link>}
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
