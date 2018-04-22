import React from 'react';
import '../../scss/components/IndexPage.scss';

//used to color the checkboxes
const colors = [
  {color: 'black', code: '#000000'},
  {color: 'grey', code: '#eeeeee'},
  {color: 'white', code: '#ffffff'},
  {color: 'beige', code: '#ffcc99'},
  {color: 'cream', code: '#f2e3c9'},
  {color: 'brown', code: '#994c00'},
  {color: 'red', code: '#ff0000'},
  {color: 'orange', code: '#ff8000'},
  {color: 'yellow', code: '#ffff00'},
  {color: 'green', code: '#006600'},
  {color: 'blue', code: '#0000ff'},
  {color: 'purple', code: '#990099'},
  {color: 'pink', code: '#FF99CC'},
  {color: 'gold', code: '#EEE8AA'},
  {color: 'silver', code: '#858785'}
];

//filter by price, occasion or color

const Filtering = ({handleSearch, filter, handleFilter, handleFilterColor, filterColor}) => {
  return(
    <div className="filterBy">
      <h4 className="subtitle is-size-4 is-italic">Filter criteria</h4>
      {/* Filter by price range */}
      <div className="filter price">
        <h5 className="subtitle is-size-5 is-italic">Price:</h5>
        <form>
          <div className="filterFields">
            <div className="field filterByControl price">
              <label className="label is-size-6" htmlFor="email">Min</label>
              <input className="inputPrice" type="text" name="minPrice" placeholder="£0" onChange={handleSearch} />
            </div>
            <div className="field filterByControl price">
              <label className="label is-size-6" htmlFor="email">Max</label>
              <input className="inputPrice" type="text" name="maxPrice" placeholder="£500" onChange={handleSearch} />
            </div>
          </div>
        </form>
      </div>

      {/* Filter by one or more occasions */}
      <div className="filter">
        <h5 className="subtitle is-size-5 is-italic">Occasion:</h5>
        <form>
          <div className="control filterByControl">
            {Object.keys(filter).map((elt, i) =>
              <label key={i} className="checkbox">
                <input className="inputOccasion" type="checkbox" checked={filter[elt]} value={elt} onClick={handleFilter} />
                {elt}
              </label>
            )}
          </div>
        </form>
      </div>

      {/* Filter by one or more colors */}
      <div className="filter">
        <h5 className="subtitle is-size-5 is-italic">Colors:</h5>
        <form>
          <div className="control filterByControl color">
            {colors.map((colorElt, i) =>
              <label key={i} className="container">
                <input className="checkbox" type="checkbox" value={colorElt.color} onClick={handleFilterColor} checked={filterColor[colorElt.color]}/>
                <span className="checkmark" style={{backgroundColor: `${colorElt.code}`}}></span>
              </label>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filtering;
