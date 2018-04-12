import React from 'react';
import axios from 'axios';
import '../../scss/components/IndexPage.scss';
import _ from 'lodash';
import { Link } from 'react-router-dom';

//I installed this query String parsing library to parse the query in URL
const queryString = require('query-string');

//used to sort results asc desc on price or brand
const sortOption = [
  {sortCriteria: 'rentalPrice|desc', text: 'High $ - Low $'},
  {sortCriteria: 'rentalPrice|asc', text: 'Low $ - High $'},
  {sortCriteria: 'brand|asc', text: 'Brand Name (A - Z)'},
  {sortCriteria: 'brand|desc', text: 'Brand Name (Z - A)'}
];

//used to color the checkboxes
const colors = [
  {color: 'Black', code: '#000000'},
  {color: 'Grey', code: '#eeeeee'},
  {color: 'White', code: '#ffffff'},
  {color: 'Beige', code: '#ffcc99'},
  {color: 'Cream', code: '#f2e3c9'},
  {color: 'Brown', code: '#994c00'},
  {color: 'Red', code: '#ff0000'},
  {color: 'Orange', code: '#ff8000'},
  {color: 'Yellow', code: '#ffff00'},
  {color: 'Green', code: '#006600'},
  {color: 'Blue', code: '#0000ff'},
  {color: 'Purple', code: '#990099'},
  {color: 'Pink', code: '#FF99CC'},
  {color: 'Gold', code: '#EEE8AA'},
  {color: 'Silver', code: '#858785'}
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
const filterColor = {
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
    parsedUrlQuery: {},
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
    if((JSON.stringify(parsedQuery) !== JSON.stringify(this.state.parsedUrlQuery) || this.state.parsedUrlQuery === {})) {
      this.clearAll(); //clear all filters;
      this.setState({parsedUrlQuery: parsedQuery});
    }
  }

  render(){
    return(
      <section>
        <div className="columns is-multiline">
          <div className="column is-one-quarter">

            {/* refactor - to include in separate components */}
            <div className="searchBy">
              <h4 className="subtitle is-size-4 is-italic">Search criteria</h4>
              <form>
                <div className="field SearchByControl">
                  <div className="control has-icons-left">
                    <input className="searchField has-text-centered" type="text" name="query" placeholder="Search by brand or product description" onChange={this.handleSearch} />
                    <span className="icon is-small is-left"><i className="fas fa-search"></i></span>
                  </div>
                </div>
              </form>
            </div>

            {/* Radio button to Sort asc/desc by price or brand */}
            <div className="sortBy">
              <h4 className="subtitle is-size-4 is-italic">Sort criteria</h4>
              <form>
                <div className="control SortByControl">
                  {sortOption.map((elt, i) =>
                    <label key={i} className="radio">
                      <input type="radio" value={elt.sortCriteria} onChange={this.handleSort} checked={this.state.selectedRadio===elt.sortCriteria} />
                      {elt.text}
                    </label>
                  )}
                </div>
              </form>
            </div>

            <div>
              <h4 className="subtitle is-size-4 is-italic">Filter criteria</h4>
              {/* Filter by price range */}
              <div className="FilterBy">
                <h5 className="subtitle is-size-5 is-italic">Rental Price</h5>
                <form>
                  <div className="field FilterByControl">
                    <label className="label" htmlFor="email">Min Price</label>
                    <input type="text" name="minPrice" placeholder="£0" onChange={this.handleSearch} />
                  </div>
                  <div className="field FilterByControl">
                    <label className="label" htmlFor="email">Max Price</label>
                    <input type="text" name="maxPrice" placeholder="£500" onChange={this.handleSearch} />
                  </div>
                </form>
              </div>

              {/* Filter by one or more occasions */}
              <div className="FilterBy">
                <h5 className="subtitle is-size-5 is-italic">Occasion</h5>
                <form>
                  <div className="control FilterByControl">
                    {Object.keys(this.state.filter).map((elt, i) =>
                      <label key={i} className="checkbox">
                        <input type="checkbox" checked={this.state.filter[elt]} value={elt} onClick={this.handleFilter} />
                        {elt}
                      </label>
                    )}
                  </div>
                </form>
              </div>

              {/* Filter by one or more colors */}
              <div className="FilterBy">
                <h5 className="subtitle is-size-5 is-italic">Colors</h5>
                <form>
                  <div className="control FilterByControl">
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
            <button onClick={this.clearAll}>Clear all filters</button>
          </div>

          <div className="column is-three-quarter">
            {/* Navbar showing category title and nb of results */}
            <nav className="navbar">
              <div className="navbar-menu">
                <div className="navbar-start">
                  <h5 className="subtitle is-size-5"><strong>Category:</strong> {this.state.parsedUrlQuery.category ? this.state.parsedUrlQuery.category : 'All categories'}
                    {this.state.parsedUrlQuery.type? '/' + this.state.parsedUrlQuery.type: '' }  </h5>
                </div>
                <div className="navbar-end">
                  <h5 className="subtitle is-size-5">{/* Placeholder navigations buttons */}</h5>
                </div>
              </div>
            </nav>

            {/* Result display */}
            <div className="columns is-multiline">
              {this.searchFilterSorting().map((item, i) =>
                <div key={i} className="column is-one-third">
                  <Link to={`/items/${item._id}`}>
                    <div className="card">
                      <div
                        style={{backgroundImage: `url(${item.mainImage})`, backgroundSize: 'cover'}} className="card-image">
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
