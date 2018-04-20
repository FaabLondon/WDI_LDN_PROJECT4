import React from 'react';
import '../../scss/components/IndexPage.scss';

/* Navbar showing category title and nb of results */

const Navbar = ({newArr, parsedUrlQuery}) => {
  return (
    <nav className="navbar">
      <div className="navbar-menu">
        <div className="navbar-start">
          <h5 className="subtitle is-size-5"><strong>Category:</strong> {parsedUrlQuery.category ? parsedUrlQuery.category : 'All categories'}
            {parsedUrlQuery.type? '/' + parsedUrlQuery.type: '' } ({newArr.length})  </h5>
        </div>
        <div className="navbar-end">
          <h5 className="subtitle is-size-5">{/* Placeholder navigations buttons */}</h5>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
