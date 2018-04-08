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
      </section>
    );
  }
}

export default CreateOrderRoute;
