import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import User from '../../lib/User';

//had to use withRouter HOC in order to give history, match to this component
import { withRouter } from 'react-router-dom';

//Use the injectStripe HOC. A higher-order component (HOC) is a function that takes a component and returns a new component.
import {injectStripe} from 'react-stripe-elements';
import AddressSection from './AddressSection';
import CardSection from './CardSection';
import CartSummary from '../cart/CartSummary';
import '../../scss/components/checkOutForm.scss';

class CheckOutForm extends React.Component {

  state = {
    errors: {},
    errorPayment: '',
    orderTotal: 0
  }

  componentDidMount= () => {
    //added a get User in case users refreshes the browser and user instance is lost...
    axios({
      method: 'GET',
      url: '/api/user',
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => User.setCurrentUser(res.data))
      .catch();
  }

  handleChange = ({target: {name, value}}) => {
    const errors = { ...this.state.errors, [name]: ''};
    this.setState({[name]: value, errors});
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
            amount: this.state.orderTotal,
            currency: 'gbp',
            payee: User.getCurrentUser().username || '',
            UserEmail: User.getCurrentUser().email || ''
          };
        }
      })
      // Once card is tokenised, send a post request to proceed to payment
      .then(() => axios({
        method: 'POST',
        url: '/api/orders',
        headers: {Authorization: `Bearer ${Auth.getToken()}`},
        data: { ...this.state, ...data}
      })
        .then(res => this.props.history.push({pathname: '/OrderValidation', state: { user: res.data }})) //redirect to order conffirmation page with returned user as param
        .catch(err => {
          //errors message are in format orders.X.billingAddress as orders are nested in user model in DB so had to extract the info below...
          const errors = {};
          Object.keys(err.response.data.errors).map(elt =>
            errors[elt.split('.')[2]] = err.response.data.errors[elt]
          );
          this.setState({ errors }, () => console.log('this.state', this.state));
        }));
  }

  //Update total order amount
  updateOrderTotal = (orderTotal) => {
    this.setState({orderTotal: orderTotal });
  }

  render() {
    return (
      <section>
        <h3 className="title is-size-3">Proceed to order</h3>
        <h6 className="title is-size-6 has-text-grey"><span><i className="fas fa-arrow-alt-circle-right"></i></span> Click & Collect - coming soon </h6>
        <form onSubmit={this.handleSubmit}>
          <div className="columns">
            <div className="column is-half">
              <AddressSection handleChange={this.handleChange} errors={this.state.errors}/>
              <CardSection errorPayment={this.state.errorPayment}/>
            </div>
            <div className="column is-half">
              <h5 className="subtitle is-size-5 is-italic"><strong>3) Please check your order</strong></h5>
              <CartSummary updateOrderTotal={this.updateOrderTotal}/>
            </div>
          </div>
          {this.state.orderTotal > 0 && <button className="button checkOut">Validate {this.state.orderTotal}£ payment</button>}
        </form>
      </section>
    );
  }
}

export default withRouter(injectStripe(CheckOutForm));
