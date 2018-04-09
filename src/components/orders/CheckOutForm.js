import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import User from '../../lib/User';

//Use the injectStripe HOC. A higher-order component (HOC) is a function that takes a component and returns a new component.
import {injectStripe} from 'react-stripe-elements';
import AddressSection from './AddressSection';
import CardSection from './CardSection';
import '../../scss/components/checkOutForm.scss';

class CheckOutForm extends React.Component {

  state = {
    errors: {},
    errorPayment: ''
  }

  handleChange = ({target: {name, value}}) => {
    this.setState({[name]: value}, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    // prevent default from submission
    e.preventDefault();
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({type: 'card', name: 'Fabienne P'})
      .then(res => {
        console.log('Received Stripe token:', res);
        if(res.error) this.setState({errorPayment: res.error.message});
        else {
          console.log('token', res.token.id);
          const data = {
            token: res.token.id,
            amount: 100.25,
            currency: 'gbp',
            payee: User.getCurrentUser().username,
            UserEmail: User.getCurrentUser().email
          };
          axios({
            method: 'POST',
            url: '/api/orders',
            headers: {Authorization: `Bearer ${Auth.getToken()}`},
            data: { ...this.state, ...data }
          })
            .then(res => {
              console.log('res.data', res.data);
              console.log('order submitted - redirect');
            })
            //errors message do not work as errors gets object in format orders.0.billingAddress as orders are nested in user model
            .catch(err => this.setState({errors: err.response.data.errors}, () => console.log('this.state when errors', this.state))
            );
        }
      });

  }

  render() {
    return (
      <section>
        <h3 className="title is-size-3">Proceed to order</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="columns">
            <AddressSection handleChange={this.handleChange} errors={this.state.errors}/>
            <CardSection errorPayment={this.state.errorPayment}/>
          </div>
          <button className="button CheckOut">Validate payment & order</button>
        </form>
      </section>
    );
  }
}

export default injectStripe(CheckOutForm);
