import React from 'react';
import '../../scss/components/IndexPage.scss';
import { Link } from 'react-router-dom';

//display the search result after filtering, sorting etc on the index page
const ResultDisplay = ({newArr}) => {
  return(
    <div className="columns is-multiline">
      {newArr.map((item, i) =>
        <div key={i} className="column is-one-third">
          <Link to={`/items/${item._id}`}>
            <div className="card">
              <div
                style={{backgroundImage: `url(${item.mainImage})`}} className="card-image indexImage">
              </div>
              <div className="card-content">
                <div className="content cardContent">
                  <h6 className="title is-size-6">{item.brand}</h6>
                  <h6 className="subtitle is-size-7">{item.shortDescription}</h6>
                  <h6 className="subtitle is-size-7">£{item.rentalPrice} per day <span className="has-text-grey">| £{item.retailPrice} retail</span></h6>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
