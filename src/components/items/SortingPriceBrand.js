import React from 'react';
import '../../scss/components/IndexPage.scss';

//used to sort results asc desc on price or brand
const sortOption = [
  {sortCriteria: 'rentalPrice|desc', text: 'High $ - Low $'},
  {sortCriteria: 'rentalPrice|asc', text: 'Low $ - High $'},
  {sortCriteria: 'brand|asc', text: 'Brand Name (A - Z)'},
  {sortCriteria: 'brand|desc', text: 'Brand Name (Z - A)'}
];

/* Radio button to Sort asc/desc by price or brand */
const SortingPriceBrand = ({handleSort, selectedRadio }) => {
  return(
    <div className="sortBy">
      <h4 className="subtitle is-size-4 is-italic">Sort criteria</h4>
      <form>
        <div className="control SortByControl">
          {sortOption.map((elt, i) =>
            <label key={i} className="radio">
              <input className="inputOrder" type="radio" value={elt.sortCriteria} onChange={handleSort} checked={selectedRadio===elt.sortCriteria} />
              {elt.text}
            </label>
          )}
        </div>
      </form>
    </div>
  );
};

export default SortingPriceBrand;
