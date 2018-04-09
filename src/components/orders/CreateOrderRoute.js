import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import {StripeProvider} from 'react-stripe-elements';

import MyStoreCheckout from './MyStoreCheckout';

import '../../scss/components/createOrderRoute.scss';

class CreateOrderRoute extends React.Component{

  state = {
    items: [],
    errors: {}
  }

  componentDidMount= () => {

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

  //publishable Key in apiKey
  render() {
    return (
      <StripeProvider apiKey="pk_test_w4scHvc0KEjjB2wjXqRS4HUZ">
        <MyStoreCheckout />
      </StripeProvider>
    );
  }
}

export default CreateOrderRoute;
