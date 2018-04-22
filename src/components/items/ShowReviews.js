import React from 'react';
import User from '../../lib/User';
import Auth from '../../lib/Auth';
import '../../scss/components/ShowPage.scss';

const ShowProduct = ({ handleAddReview, handleDeleteReview, handleChange, item }) => {
  return(
    <div className="columns is-multiline">
      {/* Review section */}
      <div className="column reviews">
        <h5 className="subtitle is-5"><strong>Please leave a comment</strong></h5>
        <article className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              {User.getCurrentUser() &&
                <div className="userPicture" style={{backgroundImage: `url(${User.getCurrentUser().picture})`}}>
                </div>
              }
              {!User.getCurrentUser() &&
                  <div className="userPicture" style={{backgroundImage: 'url(https://images.cdn.stuff.tv/sites/stuff.tv/files/avatar.png)'}}> </div>
              }
            </figure>
          </div>
          <div className="media-content">
            {User.getCurrentUser() && <p className="title is-4">{User.getCurrentUser().username}</p>}
            {User.getCurrentUser() && <p className="subtitle is-6">{User.getCurrentUser().email}</p>}
          </div>
        </article>
        <div>
          <form onSubmit={handleAddReview}>
            <div className="field">
              <div className="control">
                <label className="label">Title</label>
                <input name="maintitle" className="input" type="text" placeholder="Add a title for your comment..." required minLength="2" onChange={handleChange} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">Describe your experience</label>
                <textarea name="content" className="textarea" placeholder="Add a comment..." required minLength="2" onChange={handleChange}></textarea>
              </div>
            </div>
            {Auth.isAuthenticated() && <button className="button addComment">Submit</button>}
          </form>
        </div>

        {/* Show previous reviews */}
        <div className="previousReviews">
          <h5 className="subtitle is-5"><strong>Previous comments</strong></h5>
          {item.reviews.map((review, i) =>
            <article key={i} className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  {review.user.picture === ''? <img src="https://images.cdn.stuff.tv/sites/stuff.tv/files/avatar.png" /> : <img src={review.user.picture} />}
                </p>
                <strong>{review.user.username}</strong>
              </figure>

              <div className="media-content">
                <div className="content">
                  <small>{review.formattedDate}</small>
                  <strong>{review.maintitle}</strong>
                  {review.content}
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
                {(Auth.isAuthenticated() && review.user._id === Auth.getPayload().sub) &&
                <button type="button" onClick={() => handleDeleteReview(review._id)} className="delete">
                </button>
                }
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
