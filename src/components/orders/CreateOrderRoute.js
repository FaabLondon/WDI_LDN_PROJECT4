import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import {StripeProvider} from 'react-stripe-elements';

import '../../scss/components/createOrderRoute.scss';

class CreateOrderRoute extends React.Component{

  state = {
    items: [],
    errors: {}
  }

  componentDidMount= () => {
    console.log('api Key', process.env.STRIPE_API_KEY);
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({[name]: value}, () => console.log(this.state));
  }

  handleAddOrder = () => {
    axios({
      method: 'POST',
      url: '/api/orders',
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => console.log(res.data));
  }


  render() {
    return (
      <StripeProvider apiKey={process.env.STRIPE_API_KEY}>
        <section>
          <h3 className="title is-size-3">Proceed to order</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="columns">
              <div className="column is-half">
                <h5 className="subtitle is-size-5 is-italic"><strong>1) Please enter your Delivery address</strong></h5>
                <div className="field">
                  <label className="label" htmlFor="deliveryAddress">Street & number</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      placeholder="Enter your street and number"
                      name="deliveryAddress"
                      onChange={this.handleChange}
                    />
                    <span className="icon is-small is-left"><i className="fas fa-home"></i></span>
                  </div>
                  {this.state.errors.deliveryAddress && <small>{this.state.errors.deliveryAddress}</small>}
                </div>
                <div className="field">
                  <label className="label" htmlFor="deliveryPostcode">Postcode</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      placeholder="Enter your postcode"
                      name="deliveryPostcode"
                      onChange={this.handleChange}
                    />
                    <span className="icon is-small is-left"><i className="fas fa-home"></i></span>
                  </div>
                  {this.state.errors.deliveryPostcode && <small>{this.state.errors.deliveryPostcode}</small>}
                </div>
                <div className="field">
                  <label className="label" htmlFor="deliveryCity">City</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      placeholder="Enter your city"
                      name="deliveryCity"
                      onChange={this.handleChange}
                    />
                    <span className="icon is-small is-left"><i className="fas fa-home"></i></span>
                  </div>
                  {this.state.errors.deliveryCity && <small>{this.state.errors.deliveryCity}</small>}
                </div>

                <h5 className="subtitle is-size-5 is-italic"><strong>2) Please enter your Billing address</strong></h5>
                <div className="field">
                  <label className="label" htmlFor="billingAddress">Street & number</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      placeholder="Enter your street and number"
                      name="billingAddress"
                      onChange={this.handleChange}
                    />
                    <span className="icon is-small is-left"><i className="fas fa-home"></i></span>
                  </div>
                  {this.state.errors.billingAddress && <small>{this.state.errors.billingAddress}</small>}
                </div>
                <div className="field">
                  <label className="label" htmlFor="billingPostcode">Postcode</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      placeholder="Enter your postcode"
                      name="billingPostcode"
                      onChange={this.handleChange}
                    />
                    <span className="icon is-small is-left"><i className="fas fa-home"></i></span>
                  </div>
                  {this.state.errors.billingPostcode && <small>{this.state.errors.billingPostcode}</small>}
                </div>
                <div className="field">
                  <label className="label" htmlFor="billingCity">City</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      placeholder="Enter your city"
                      name="billingCity"
                      onChange={this.handleChange}
                    />
                    <span className="icon is-small is-left"><i className="fas fa-home"></i></span>
                  </div>
                  {this.state.errors.billingCity && <small>{this.state.errors.billingCity}</small>}
                </div>
              </div>
              <div className="column is-half">
                <h5 className="subtitle is-size-5 is-italic"><strong>3) Please enter your payment information</strong></h5>
                <div className="field">
                  <label className="label" htmlFor="creditCardNumber">Credit card number</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      placeholder="Enter your credit card number"
                      name="creditCardNumber"
                      onChange={this.handleChange}
                      maxLength="12"
                      minLength="12"
                      required
                    />
                    <span className="icon is-small is-left"><i className="far fa-credit-card"></i></span>
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor="nameCard">Name on the card</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      placeholder="Enter your name as written on your card"
                      name="nameCard"
                      onChange={this.handleChange}
                      required
                    />
                    <span className="icon is-small is-left"><i className="far fa-credit-card"></i></span>
                  </div>
                </div>
                <div className="field expCard">
                  <label className="label" htmlFor="expCard">Card expiry</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      placeholder="mm/yy"
                      name="expCard"
                      onChange={this.handleChange}
                      required
                    />
                    <span className="icon is-small is-left"><i className="far fa-credit-card"></i></span>
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor="ccvCard">ccv</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      placeholder="ccv"
                      name="ccvCard"
                      onChange={this.handleChange}
                      required
                    />
                    <span className="icon is-small is-left"><i className="far fa-credit-card"></i></span>
                  </div>
                </div>
                <button className="button is-primary">Validate payment & order</button>
              </div>
            </div>
          </form>
        </section>
      </StripeProvider>
    );
  }
}

export default CreateOrderRoute;
