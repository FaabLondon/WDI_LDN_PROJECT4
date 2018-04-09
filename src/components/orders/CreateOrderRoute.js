import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Cart from '../../lib/Cart';
import { Link } from 'react-router-dom';

import '../../scss/components/createOrderRoute.scss';

class CreateOrderRoute extends React.Component{

  state = {
    items: []
  }

  componentDidMount= () => {

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
      <section>
        Placeholder for form for delivery and billing address + card payment info
        <form onSubmit={this.handleSubmit}>
          <h3 className="subtitle is-size-3 is-italic">Delivery address</h3>
          <div className="field">
            <label className="label" htmlFor="streetNumber">Street & number</label>
            <div className="control has-icons-left">
              <input
                className="input"
                placeholder="Enter your street and number"
                name="username"
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left"><i className="far fa-user"></i></span>
            </div>
            {this.state.errors.username && <small>{this.state.errors.username}</small>}
          </div>
          <div className="field">
            <label className="label" htmlFor="email">Email</label>
            <div className="control has-icons-left">
              <input
                className="input"
                placeholder="Enter your email"
                name="email"
                onChange={this.handleChange}
                pattern="^\w+@\w+\..{2,3}(.{2,3})?$"
              />
              <span className="icon is-small is-left"><i className="far fa-envelope"></i></span>
            </div>
            {this.state.errors.email && <small>{this.state.errors.email}</small>}
          </div>
          <div className="field">
            <label className="label" htmlFor="password">Password</label>
            <div className="control">
              <input
                type="password"
                className="input"
                placeholder="Enter your password"
                name="password"
                onChange={this.handleChange}
              />
            </div>
            {this.state.errors.password && <small>{this.state.errors.password}</small>}
          </div>
          <div className="field">
            <label className="label" htmlFor="passwordConfirmation">Password Confirmation</label>
            <div className="control">
              <input
                type="password"
                className="input"
                placeholder="Enter your password Confirmation"
                name="passwordConfirmation"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <button className="button is-primary">Submit</button>
        </form>
      </section>
    );
  }
}

export default CreateOrderRoute;
