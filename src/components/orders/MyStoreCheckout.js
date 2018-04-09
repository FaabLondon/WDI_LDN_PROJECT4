import React from 'react';
import {Elements} from 'react-stripe-elements';

import CheckOutForm from './CheckOutForm';

class MyStoreCheckout extends React.Component {
  render() {
    return (
      <Elements>
        <CheckOutForm />
      </Elements>
    );
  }
}

export default MyStoreCheckout;
