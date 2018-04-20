import React from 'react';
import '../../scss/components/IndexPage.scss';

const BrandProductSearch = ({handleSearch}) => {
  return(
    <div className="searchBy">
      <h4 className="subtitle is-size-4 is-italic">Brand and Product</h4>
      <form>
        <div className="field SearchByControl">
          <p className="control has-icons-left">
            <input className="searchField input" type="text" name="query" placeholder="Search by brand or product description" onChange={handleSearch} />
            <span className="icon is-small is-left"><i className="fas fa-search"></i></span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default BrandProductSearch;
