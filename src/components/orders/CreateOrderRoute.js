import React from 'react';
import {StripeProvider} from 'react-stripe-elements';

import MyStoreCheckout from './MyStoreCheckout';

import '../../scss/components/createOrderRoute.scss';

class CreateOrderRoute extends React.Component{

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
