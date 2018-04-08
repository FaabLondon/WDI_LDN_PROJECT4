import React from 'react';
import axios from 'axios';

import '../../scss/components/ShowPage.scss';
import { Link } from 'react-router-dom';

class ShowRoute extends React.Component{

  state = {
    item: ''
  }

  componentDidMount= () => {
    axios.get(`/api/items/${this.props.match.params.id}`)
      .then(res => this.setState({ item: res.data }))
      .then(() => console.log(this.state));
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
              <p className="subtitle is-6"></p>
              <h6 className="subtitle is-7">£{this.state.item.rentalPrice} per day <span className="has-text-grey">| £{this.state.item.retailPrice} retail</span></h6>
            </div>
            <div className="showButtons">
              <Link to={`/api/cart/items/${this.state.item._id}`} className="button">Add to my cart</Link>
              <button className="button">Remove from my cart</button>
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
