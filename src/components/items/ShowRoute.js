import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import '../../scss/components/ShowPage.scss';
import Cart from '../../lib/Cart';
import Flash from '../../lib/Flash';
import { Link } from 'react-router-dom';

import ShowProduct from './ShowProduct';
import ShowReviews from './ShowReviews';

class ShowRoute extends React.Component{

  state = {
    item: {
      reviews: [],
      smallImages: []
    },
    mouseOverImg: '',
    message: '',
    nbItemIdCart: 0
  }

  // if link don;t work in navbar, make sure to get the cart from server and set it in componentDidMount

  componentDidMount= () => {
    //added a get cart case user refreshes the page which deletes the Cart or in case user is not logged in
    const itemId = this.props.match.params.id;
    let nbItemIdCart;

    //only get cart info if authenticated
    if(Auth.isAuthenticated()){
      nbItemIdCart = Cart.getnbItemCart(itemId);
    }
    //get the populated item (product) information
    axios.get(`/api/items/${itemId}`)
      .then(res => this.setState({ item: res.data, nbItemIdCart: nbItemIdCart, mouseOverImg: res.data.mainImage }));
  }

  handleClick = (i, image) => {
    //swaps small image clicked on with the one being displayed in main window - I removed mouseover as I thought that it was making my app bug on Chrome on mobile...
    const smallImages = this.state.item.smallImages.slice(); //clone array
    smallImages[i] = this.state.mouseOverImg;
    this.setState({mouseOverImg: image, item: Object.assign(this.state.item, {smallImages: smallImages}) });
  }

  //add the item to the cart - only if logged in
  handleAddCart = () => {
    if(Auth.isAuthenticated()){
      axios({
        method: 'POST',
        url: `/api/cart/items/${this.state.item._id}`,
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      })
        .then(res => {
          Cart.setCart(res.data);
          this.setState({message: 'This item was succesfully added to your shopping basket!', nbItemIdCart: Cart.getnbItemCart(this.state.item._id)});
        });
    } else {
      Flash.setMessage('danger', 'You must be logged in to perform this action.');
      this.props.history.push({pathname: '/login'});
    }
  }

  //delete the item from the cart - only if logged in
  handleDeleteCart = () => {
    if(Auth.isAuthenticated()){
      axios({
        method: 'DELETE',
        url: `/api/cart/items/${this.state.item._id}`,
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      })
        .then(res => {
          Cart.setCart(res.data);
          this.setState({message: 'This item was succesfully removed from your shopping basket!', nbItemIdCart: Cart.getnbItemCart(this.state.item._id)});
        });
    } else {
      Flash.setMessage('danger', 'You must be logged in to perform this action.');
      this.props.history.push({pathname: '/login'});
    }
  }

  //for new review form
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  //to add a new review
  handleAddReview = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: `/api/items/${this.state.item._id}/reviews`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`},
      data: this.state
    })
      .then(res => this.setState({ item: res.data }))
      .catch(err => {
        this.setState({errors: err.response.data.errors});
      });
  }

  //to delete a review
  handleDeleteReview = (reviewId) => {
    axios({
      method: 'DELETE',
      url: `/api/items/${this.state.item._id}/reviews/${reviewId}`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ item: res.data }))
      .catch(err => {
        this.setState({errors: err.response.data.errors});
      });
  }

  render() {
    //console.log(User.getCurrentUser());
    return (
      <section>
        <Link className="is-italic" to="/items"><strong>Back to search results</strong></Link>
        {/* Show product section */}
        <ShowProduct
          handleClick={this.handleClick}
          handleDeleteCart={this.handleDeleteCart}
          handleAddCart={this.handleAddCart}
          {...this.state}
        />
        <ShowReviews
          handleAddReview={this.handleAddReview}
          handleDeleteReview = {this.handleDeleteReview}
          handleChange = {this.handleChange}
          item={this.state.item}
        />
      </section>
    );
  }
}

export default ShowRoute;
