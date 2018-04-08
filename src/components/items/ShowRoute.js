import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import '../../scss/components/ShowPage.scss';
import { Link } from 'react-router-dom';
import Flash from '../../lib/Flash';
import Cart from '../../lib/Cart';

class ShowRoute extends React.Component{

  state = {
    item: {},
    message: '',
    nbItemCart: 0
  }

  // if link don;t work in navbar, make sure to get the cart from server and set it in componentDidMount

  componentDidMount= () => {
    const itemId = this.props.match.params.id;
    //get the item (product)
    axios.get(`/api/items/${itemId}`)
      .then(res => this.setState({ item: res.data, nbItemCart: Cart.getnbItemCart(itemId) }))
      .then(() => console.log(this.state));
  }

  handleAddCart = () => {
    axios({
      method: 'POST',
      url: `/api/cart/items/${this.state.item._id}`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => {
        Cart.setCart(res.data);
        this.setState({message: 'This item was succesfully added to your cart!', nbItemCart: Cart.getnbItemCart(this.state.item._id)});
      });
  }

  handleDeleteCart = () => {
    axios({
      method: 'DELETE',
      url: `/api/cart/items/${this.state.item._id}`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => {
        Cart.setCart(res.data);
        this.setState({message: 'This item was succesfully removed from your cart!', nbItemCart: Cart.getnbItemCart(this.state.item._id)});
      });
  }

  render() {
    return (
      <section>
        <div className="columns is-multiline">
          <div className="column is-half">
            <figure className="image">
              <div className="imgItem" style={{background: `url(${this.state.item.mainImage})`, backgroundSize: 'cover'}}>
              </div>
            </figure>
          </div>
          <div className="column is-half">
            <div className="content">
              <h1 className="is-1">{this.state.item.brand}</h1>
              <p className="subtitle">{this.state.item.shortDescription}</p>
            </div>
            <div className="averageRating">
              <span>No rating yet</span>
            </div>
            <div className="content">
              <p className="subtitle is-6">{this.state.item.longDescription}</p>
              <p className="subtitle is-6">Size: {this.state.item.sizeAvailable}</p>
              <h6 className="subtitle is-7">£{this.state.item.rentalPrice} per day <span className="has-text-grey">| £{this.state.item.retailPrice} retail</span></h6>
            </div>
            <div className="showButtons">
              <div>Add / remove from my shopping bag</div>
              <button onClick={this.handleDeleteCart} className="button">-</button>
              <button onClick={this.handleAddCart} className="button">+</button>
              <span>Quantity {this.state.nbItemCart}</span>
              <div>{this.state.message}</div>
            </div>
          </div>

          {/* Review section */}
          <div className="column reviews">
            <article className="media">
              <figure className="media-left">
                <p className="image is-4by3">
                  <img src="https://www.fillmurray.com/140/100" />
                </p>
              </figure>
              <div className="media-content">
                <form>
                  <div className="field">
                    <div className="control">
                      <label className="label">Please add a rating</label>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label className="label">Title</label>
                      <input name="maintitle" className="input" type="text" placeholder="Add a title for your comment..." required minLength="2" />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label className="label">Describe your experience</label>
                      <textarea name="content" className="textarea" placeholder="Add a comment..." required minLength="2"></textarea>
                    </div>
                  </div>
                  <button className="button is-info">Submit</button>
                </form>
              </div>
            </article>

            {/* Show previous reviews */}
            {/* if review moderated */}
            <article className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src="https://www.fillmurray.com/140/100" />
                </p>
                <strong>Username</strong>
              </figure>

              <div className="media-content">
                <div className="content">
                  <div className="reviewRating" data-value="<%= review.rating %>">
                  review rating
                  </div>
                  <small>review formatted date</small>
                  <strong>review maintitle</strong>
                  review content
                </div>
                <nav className="level is-mobile">
                  <div className="level-left">
                    <a className="level-item">
                      <span className="icon is-small"><i className="fas fa-reply"></i></span>
                    </a>
                    <a className="level-item">
                      <span className="icon is-small"><i className="fas fa-heart"></i></span>
                    </a>
                  </div>
                </nav>
              </div>
              <div className="media-right">
                {/* <% if (locals.isAuthenticated && review.isOwnedBy(locals.currentUser)) {%> */}
                <form>
                  <button className="delete"></button>
                </form>
              </div>
            </article>
          </div>
        </div>
      </section>
    );
  }
}

export default ShowRoute;
