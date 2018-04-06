import React from 'react';
import Auth from '../../lib/Auth';
import axios from 'axios';
import Flash from '../../lib/Flash';

class Register extends React.Component{

  state = {
    errors: {}
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    let username = '';
    axios.post('/api/register', this.state)
      .then(res => {
        username = res.data.user.username;
        Auth.setToken(res.data.token);
      })
      .then(() => {
        Flash.setMessage('success', `Welcome ${username}! You were succesfully registered!`);
        this.props.history.push('/items');
      })
      //need to be added to state to re-render the form with error messages
      .catch(err => {
        //err received from global error handler
        this.setState({errors: err.response.data.errors}, () => console.log(this.state));
      });
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="username">Username</label>
          <div className="control has-icons-left">
            <input
              className="input"
              placeholder="Enter your username"
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
    );
  }
}

export default Register;
