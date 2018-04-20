import React from 'react';
import Auth from '../../lib/Auth';
import axios from 'axios';
import Flash from '../../lib/Flash';
import User from '../../lib/User';
import ReactFilestack from 'filestack-react';

import '../../scss/components/register.scss';

const options = {
  accept: 'image/*',
  maxFiles: 1,
  minFiles: 1,
  maxSize: 1024*1024,
  imageDim: [150, 150],
  transformations: { crop: true }
};

class Register extends React.Component{

  state = {
    errors: {},
    picture: ''
  }

  handleFileUpload = (res) => {
    //gets uploaded picture
    this.setState({ picture: res.filesUploaded[0].url }, () => console.log(this.state));
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    axios.post('/api/register', this.state)
      .then(res => {
        User.setCurrentUser(res.data.user);
        Auth.setToken(res.data.token);
      })
      .then(() => Flash.setMessage('success', `Welcome ${this.state.username}! You were succesfully registered!`))
      .then(() =>   this.props.history.push('/items'))
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
          <label className="label" htmlFor="username">Name</label>
          <div className="control has-icons-left">
            <input
              className="input"
              placeholder="Enter your name"
              name="name"
              onChange={this.handleChange}
            />
            <span className="icon is-small is-left"><i className="far fa-user"></i></span>
          </div>
          {this.state.errors.name && <small>{this.state.errors.name}</small>}
        </div>
        <div className="field">
          <label className="label" htmlFor="username">Last Name</label>
          <div className="control has-icons-left">
            <input
              className="input"
              placeholder="Enter your Lastname"
              name="lastName"
              onChange={this.handleChange}
            />
            <span className="icon is-small is-left"><i className="far fa-user"></i></span>
          </div>
          {this.state.errors.lastName && <small>{this.state.errors.lastName}</small>}
        </div>
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
          <label className="label" htmlFor="username">Profile Picture</label>
          {this.state.picture !== '' && <div className="profilePicture register" style={{backgroundImage: `url(${this.state.picture})`}}></div>}
          <ReactFilestack
            apikey={'AFOYrjEmESlCGqN9sQtLOz'}
            buttonText="Click me to select a picture"
            buttonClass="fileUploadButton"
            options={options}
            onSuccess={this.handleFileUpload}
          />
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

        <button className="button register">Register</button>
      </form>
    );
  }
}

export default Register;
