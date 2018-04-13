import React from 'react';
import Auth from '../../lib/Auth';
import axios from 'axios';
import Flash from '../../lib/Flash';
import User from '../../lib/User';
import Cart from '../../lib/Cart';
import '../../scss/components/login.scss';

class Login extends React.Component{

  state = {
    errors: {}
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    axios.post('/api/login', this.state)
      .then(res => {
        User.setCurrentUser(res.data.user);
        Auth.setToken(res.data.token);
      })

      //get the user cart on login
      .then(() => {
        axios({
          method: 'GET',
          url: '/api/cart',
          headers: {Authorization: `Bearer ${Auth.getToken()}`}
        })
          .then(res => Cart.setCart(res.data));
      })

      //set Flash message
      .then(() => Flash.setMessage('success', `Welcome ${User.getCurrentUser().username}! You were succesfully logged in!`))
      .then(() => this.props.history.push('/items'))
      //need to be added to state to re-render the form with error messages
      .catch(err => {
        //error
        this.setState({errors: err.response.data}, () => console.log('error', this.state));
      });
  }

  render(){
    return(
      <section className="login" style={{backgroundImage: 'url(https://velvetstyle.it/wp-content/uploads/2017/12/saldi2.jpg)'}}>
        <form className="login" onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label login" htmlFor="email">Email</label>
            <div className="control has-icons-left">
              <input
                className="input login"
                placeholder="Enter your email"
                name="email"
                onChange={this.handleChange}
                pattern="^\w+@\w+\..{2,3}(.{2,3})?$"
                required
              />
              <span className="icon is-small is-left"><i className="far fa-envelope"></i></span>
            </div>
          </div>
          <div className="field">
            <label className="label login" htmlFor="password">Password</label>
            <div className="control">
              <input
                type="password"
                className="input login"
                placeholder="Enter your password"
                name="password"
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
          <button className="button login">Login</button>
          {this.state.errors.message && <small className="has-text-white">{this.state.errors.message}</small>}
        </form>
      </section>
    );
  }
}

export default Login;
