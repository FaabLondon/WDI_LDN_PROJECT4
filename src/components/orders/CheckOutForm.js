import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import User from '../../lib/User';

//Use the injectStripe HOC. A higher-order component (HOC) is a function that takes a component and returns a new component.
import {injectStripe} from 'react-stripe-elements';
import AddressSection from './AddressSection';
import CardSection from './CardSection';
import CartSummary from '../cart/CartSummary';
import '../../scss/components/checkOutForm.scss';

class CheckOutForm extends React.Component {

  state = {
    errors: {},
    errorPayment: ''
  }

  handleChange = ({target: {name, value}}) => {
    const errors = { ...this.state.errors, [name]: ''};
    this.setState({[name]: value, errors}, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    // prevent default from submission
    e.preventDefault();
    let data = {};
    // Within the context of `Elements`, this call to createToken knows which Element to tokenize, since there's only one in this group.
    this.props.stripe.createToken({type: 'card'})
      .then(res => {
        if(res.error) this.setState({errorPayment: res.error.message});
        else {
          data = {
            token: res.token.id,
            amount: 100.25,
            currency: 'gbp',
            payee: User.getCurrentUser().username,
            UserEmail: User.getCurrentUser().email
          };
        }
      })
      .then(() => axios({
        method: 'POST',
        url: '/api/orders',
        headers: {Authorization: `Bearer ${Auth.getToken()}`},
        data: { ...this.state, ...data, errorPayment: '' }
      })
        .then(res => console.log('res.data', res.data)) //need to redirect
        .catch(err => {
          //errors message are in format orders.0.billingAddress as orders are nested in user model in DB so need to modify it...
          const errors = {};
          Object.keys(err.response.data.errors).map(elt =>
            errors[elt.split('.')[2]] = err.response.data.errors[elt]
          );
          this.setState({ errors }, () => console.log('this.state', this.state));
        }));
  }

  render() {
    return (
      <section>
        <h3 className="title is-size-3">Proceed to order</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="columns">
            <div className="column is-half">
              <AddressSection handleChange={this.handleChange} errors={this.state.errors}/>
              <CardSection errorPayment={this.state.errorPayment}/>
            </div>
            <div className="column is-half">
              <h3 className="title is-size-3">Order summary</h3>
              <CartSummary />
            </div>
          </div>
          <button className="button CheckOut">Validate payment & order</button>
        </form>
      </section>
    );
  }
}

export default injectStripe(CheckOutForm);
