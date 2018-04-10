import React from 'react';
import axios from 'axios';

class OrderValidation extends React.Component {

  state = {
    userName: '',
    email: '',
    order: {}
  }

  componentDidMount(){
    console.log('this.props.history.location.state.user', this.props.history.location.state.user);
    const user = this.props.history.location.state.user;
    const userName = user.username;
    const email = user.email;
    const order = user.orders[user.orders.length - 1];
    this.setState({userName, email, order});

  }

  render() {
    return (
      <section>
        <div className="columns">
          <div className="column is-one-third">
            <img src="  https://i.pinimg.com/originals/20/15/d9/2015d99c7fcd0da2689eac475a0a2d78.jpg" />
          </div>
          <div className="column is-two-thirds">
            <h3 className="title is-size-3">Thank you {this.state.userName} for your order !</h3><br/>
            <h5 className="subtitle is-size-5 is-italic">
              Your order <strong>{this.state.order._id}</strong> is now confirmed and will be with you shortly.<br/><br/>
              A confirmation email has been sent to <strong>{this.state.email}</strong>.
            </h5>
          </div>

        </div>

      </section>
    );
  }
}

export default OrderValidation;
