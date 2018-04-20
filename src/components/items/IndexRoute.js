import React from 'react';
import axios from 'axios';
import '../../scss/components/IndexPage.scss';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import BrandProductSearch from './BrandProductSearch';
import SortingPriceBrand from './SortingPriceBrand';

//I installed this query String parsing library to parse the query in URL
const queryString = require('query-string');


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

const sortBy = 'rentalPrice';
const sortDirection = 'desc';
const selectedRadio = 'rentalPrice|desc';
const minPrice = 0;
const maxPrice = 500; //should be taken as max price across all item in DB....
const filter = {
  Daytime: false,
  Work: false,
  Weekend: false,
  Vacation: false,
  Formal: false,
  Party: false,
  Maternity: false
};
let filterColor = {};
filterColor = {
  black: false,
  grey: false,
  white: false,
  beige: false,
  cream: false,
  brown: false,
  red: false,
  orange: false,
  yellow: false,
  green: false,
  blue: false,
  purple: false,
  pink: false,
  gold: false,
  silver: false
};

class IndexRoute extends React.Component{

  state = {
    items: [],
    parsedUrlQuery: {
      category: '',
      type: ''
    },
    query: '',
    sortBy: sortBy,
    sortDirection: sortDirection,
    selectedRadio: selectedRadio,
    minPrice: minPrice,
    maxPrice: maxPrice, //should be taken as max price across all item in DB....
    filter: filter,
    filterColor: filterColor
  }

  //handle global search and search by price
  handleSearch = ({ target: { name, value } }) => {
    if(name === 'minPrice' && value === '') value = 0;
    if(name === 'maxPrice' && value === '') value = 500;
    this.setState({ [name]: value });
  }

  handleSort = (e) => {
    //split the value of selected checkbox to get sorting field and direction (asc or desc)
    const selectedRadio = e.target.value;
    const [sortBy, sortDirection] = selectedRadio.split('|');
    this.setState({ sortBy, sortDirection, selectedRadio });
  }

  handleFilter = (e) => {
    const filterBool = this.state.filter[e.target.value];
    //toggle boolean on checked box and recreate filter object
    const filter = Object.assign({}, this.state.filter, {[e.target.value]: !filterBool });
    this.setState({ filter });
  }

  handleFilterColor = (e) => {
    const filterBool = this.state.filterColor[e.target.value];
    //toggle boolean on checked box and recreate filter object
    const filterColor = Object.assign({}, this.state.filterColor, {[e.target.value]: !filterBool });
    this.setState({ filterColor });
  }

  clearAll = () => {
    this.setState({ sortBy, sortDirection, selectedRadio, minPrice, maxPrice, filter, filterColor});
  }

  //search accoding to all criteria in sort, filter etc
  searchFilterSorting = () => {
    const { parsedUrlQuery, sortBy, sortDirection, query, minPrice, maxPrice } = this.state;

    //1) render only the category and type selected in navbar
    let filtered = _.filter(this.state.items, parsedUrlQuery );

    //1) sort items in asc or desc order
    filtered = _.orderBy(filtered, [sortBy], [sortDirection] );

    //2) search on brand and product description with query string
    //create new regex to test seach query on brand name and product description
    const regex = new RegExp(query, 'i'); //case insensitive
    filtered = _.filter(filtered, (item) => regex.test(item.brand) || regex.test(item.shortDescription));

    //3) filter by price
    filtered = _.filter(filtered, (item) => item.rentalPrice >= parseInt(minPrice) && item.rentalPrice <= parseInt(maxPrice));

    //4) filter with checkboxes - extract criteria set at true - TO REFACTOR !!
    const filterCriteria = _.filter(Object.keys(this.state.filter), (criterion) => this.state.filter[criterion] === true );
    const filterCriteriaColor = _.filter(Object.keys(this.state.filterColor), (criterion) => this.state.filterColor[criterion] === true );
    //only filter if at least one checkbox is checked, otherwise no result displayed...
    if(filterCriteria.length === 0 && filterCriteriaColor.length === 0) return filtered;
    //filter items that have occasions or colors including at least one filter criterion
    filtered = _.filter(filtered, (item) => item.occasion.some(elt => filterCriteria.includes(elt)) || item.colors.some(elt => filterCriteriaColor.includes(elt)));

    return filtered;
  }

  componentDidMount(){
    //parses the search query
    // const parsedQuery = queryString.parse(this.props.location.search);
    axios.get('/api/items')
      .then(res => this.setState({items: res.data}));
  }

  componentDidUpdate() {
    const parsedQuery = queryString.parse(this.props.location.search);
    // filter the items on page load if new query or no query
    //test below to avoid infinite loop
    if((JSON.stringify(parsedQuery) !== JSON.stringify(this.state.parsedUrlQuery) || JSON.stringify(parsedQuery) === '')) {
      this.clearAll(); //clear all filters;
      this.setState({parsedUrlQuery: parsedQuery});
    }
  }

  render(){
    const newArr = this.searchFilterSorting();
    return(
      <section>
        {/* break down in smaller component for each sort / filtering etc */}
        <div className="columns is-multiline is-desktop">
          <div className="column is-one-quarter-desktop">
            <div className="is-italic" onClick={this.clearAll}><strong>Clear all filters</strong></div>
            {/* Component to filter by brand or product */}
            <BrandProductSearch handleSearch={this.handleSearch}/>
            <SortingPriceBrand handleSort={this.handleSort} selectedRadio={this.state.selectedRadio}/>


            <div className="filterBy">
              <h4 className="subtitle is-size-4 is-italic">Filter criteria</h4>
              {/* Filter by price range */}
              <div className="filter price">
                <h5 className="subtitle is-size-5 is-italic">Price:</h5>
                <form>
                  <div className="filterFields">
                    <div className="field filterByControl price">
                      <label className="label is-size-6" htmlFor="email">Min</label>
                      <input className="inputPrice" type="text" name="minPrice" placeholder="£0" onChange={this.handleSearch} />
                    </div>
                    <div className="field filterByControl price">
                      <label className="label is-size-6" htmlFor="email">Max</label>
                      <input className="inputPrice" type="text" name="maxPrice" placeholder="£500" onChange={this.handleSearch} />
                    </div>
                  </div>
                </form>
              </div>

              {/* Filter by one or more occasions */}
              <div className="filter">
                <h5 className="subtitle is-size-5 is-italic">Occasion:</h5>
                <form>
                  <div className="control filterByControl">
                    {Object.keys(this.state.filter).map((elt, i) =>
                      <label key={i} className="checkbox">
                        <input className="inputOccasion" type="checkbox" checked={this.state.filter[elt]} value={elt} onClick={this.handleFilter} />
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
                    {colors.map((color, i) =>
                      <label key={i} className="container">
                        <input className="checkbox" type="checkbox" value={color.color} onClick={this.handleFilterColor} checked={this.state.filterColor[color.color]}/>
                        <span className="checkmark" style={{backgroundColor: `${color.code}`}}></span>
                      </label>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="column is-three-quarters-desktop">
            {/* Navbar showing category title and nb of results */}
            <nav className="navbar">
              <div className="navbar-menu">
                <div className="navbar-start">
                  <h5 className="subtitle is-size-5"><strong>Category:</strong> {this.state.parsedUrlQuery.category ? this.state.parsedUrlQuery.category : 'All categories'}
                    {this.state.parsedUrlQuery.type? '/' + this.state.parsedUrlQuery.type: '' } ({newArr.length})  </h5>
                </div>
                <div className="navbar-end">
                  <h5 className="subtitle is-size-5">{/* Placeholder navigations buttons */}</h5>
                </div>
              </div>
            </nav>

            {/* Result display */}
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

          </div>
        </div>
      </section>
    );
  }
}

export default IndexRoute;
