import React from 'react';
import Auth from '../../lib/Auth';
import axios from 'axios';
import Flash from '../../lib/Flash';
import User from '../../lib/User';
import ReactFilestack from 'filestack-react';

import '../../scss/components/UpdateUserRoute.scss';

const options = {
  accept: 'image/*',
  maxFiles: 1,
  minFiles: 1,
  maxSize: 1024*1024,
  imageDim: [500, 400],
  transformations: { crop: true }
};

class UpdateUserRoute extends React.Component{

  state = { //it always has to be defined as used in value in form
    errors: {},
    name: '',
    lastName: '',
    username: '',
    email: '',
    picture: '',
    password: ''
  }

  componentDidMount(){
    //axios.get(`/api/...`)
    const user = User.getCurrentUser();
    this.setState({ ...user }, () => console.log('user state', this.state));
  }


  handleFileUpload = (res) => {
    //gets uploaded picture
    this.setState({ picture: res.filesUploaded[0].url });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    axios({
      method: 'PUT',
      url: '/api/editProfile',
      headers: {Authorization: `Bearer ${Auth.getToken()}`},
      data: this.state
    })
      .then(res => {
        User.setCurrentUser(res.data);
      })
      .then(() => Flash.setMessage('success', 'Your profile was succesfully updated!'))
      .then(() => this.props.history.push('/items'))
      //need to be added to state to re-render the form with error messages
      .catch(err => {//err received from global error handler
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
              value={this.state.name}
            />
            <span className="icon is-small is-left"><i className="far fa-user"></i></span>
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="username">Lastname</label>
          <div className="control has-icons-left">
            <input
              className="input"
              placeholder="Enter your Lastname"
              name="lastName"
              onChange={this.handleChange}
              value={this.state.lastName}
            />
            <span className="icon is-small is-left"><i className="far fa-user"></i></span>
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="username">Username</label>
          <div className="control has-icons-left">
            <input
              className="input"
              placeholder="Enter your username"
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
            />
            <span className="icon is-small is-left"><i className="far fa-user"></i></span>
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="username">Profile Picture</label>
          <div className="profilePicture" style={{background: `url(${this.state.picture})`}}></div>
          <ReactFilestack
            apikey={'AFOYrjEmESlCGqN9sQtLOz'}
            buttonText="Click me"
            buttonClass="classname"
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
              value={this.state.email}
            />
            <span className="icon is-small is-left"><i className="far fa-envelope"></i></span>
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="password">Password</label>
          <div className="control">
            <input
              type="password"
              className="input"
              placeholder="Enter your password to validate changes"
              name="password"
              onChange={this.handleChange}
            />
          </div>
        </div>

        <button className="button is-primary">Submit</button>
      </form>
    );
  }
}

export default UpdateUserRoute;
