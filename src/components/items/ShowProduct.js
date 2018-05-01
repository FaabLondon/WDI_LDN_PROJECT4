import React from 'react';
import '../../scss/components/ShowPage.scss';

const ShowProduct = ({ item, mouseOverImg, handleClick, handleDeleteCart, handleAddCart, nbItemIdCart, message }) => {
  return(
    <div className="columns is-multiline">
      <div className="column is-half images">
        <div className="smallImages">
          {item.smallImages.map((image, i) =>
            <div key={i} onClick={() => handleClick(i, image)} className="smallImage" style={{backgroundImage: `url(${image})`}}>
            </div>
          )}
        </div>
        <div className="mainImage" style={{backgroundImage: `url(${mouseOverImg})`}}>
        </div>
      </div>
      <div className="column is-half">
        <div className="content">
          <h1 className="is-1">{item.brand}</h1>
          <p className="subtitle"><strong>{item.shortDescription}</strong></p>
        </div>
        <div className="averageRating">
          {/* <span>No rating yet</span> */}
        </div>
        <div className="content">
          <p className="subtitle is-6">{item.longDescription}</p>
          <p className="subtitle is-6">Size: {item.sizeAvailable}</p>
          <h6 className="subtitle is-6">£{item.rentalPrice} per day <span className="has-text-grey">| £{item.retailPrice} retail</span></h6>
        </div>
        <div className="showButtons">
          <div>Add / remove from my shopping bag</div>
          <button onClick={handleDeleteCart} className="button">-</button>
          <button onClick={handleAddCart} className="button">+</button>
          <h5 className="is-size-5"><strong>Quantity: {nbItemIdCart} </strong></h5>
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
