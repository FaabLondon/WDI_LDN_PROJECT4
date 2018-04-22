import React from 'react';
import axios from 'axios';
import '../../scss/components/IndexPage.scss';

import BrandProductSearch from './BrandProductSearch';
import SortingPriceBrand from './SortingPriceBrand';
import Filtering from './Filtering';
import Navbar from './Navbar';
import ResultDisplay from './ResultDisplay';
import filterSortArray from '../../lib/filterSortArray';

//I installed this query String parsing library to parse the query in URL
const queryString = require('query-string');

//constant used in all sorting, filtering, etc functions
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

  //handle sorting
  handleSort = (e) => {
    //split the value of selected checkbox to get sorting field and direction (asc or desc)
    const selectedRadio = e.target.value;
    const [sortBy, sortDirection] = selectedRadio.split('|');
    this.setState({ sortBy, sortDirection, selectedRadio });
  }

  //handle filtering by price and occasion
  handleFilter = (e) => {
    const filterBool = this.state.filter[e.target.value];
    //toggle boolean on checked box and recreate filter object
    const filter = Object.assign({}, this.state.filter, {[e.target.value]: !filterBool });
    this.setState({ filter });
  }

  //handle filtering by color
  handleFilterColor = (e) => {
    const filterBool = this.state.filterColor[e.target.value];
    //toggle boolean on checked box and recreate filter object
    const filterColor = Object.assign({}, this.state.filterColor, {[e.target.value]: !filterBool });
    this.setState({ filterColor });
  }

  //clear all filters
  clearAll = () => {
    this.setState({ sortBy, sortDirection, selectedRadio, minPrice, maxPrice, filter, filterColor});
  }

  componentDidMount(){
    //gets all the items in the DB
    axios.get('/api/items')
      .then(res => this.setState({items: res.data}));
  }

  componentDidUpdate() {
    //parses the search query
    const parsedQuery = queryString.parse(this.props.location.search);
    //test below to avoid infinite loop
    // filter the items on page load if new query or no query
    if((JSON.stringify(parsedQuery) !== JSON.stringify(this.state.parsedUrlQuery) || JSON.stringify(parsedQuery) === '')) {
      this.clearAll(); //clear all filters;
      this.setState({parsedUrlQuery: parsedQuery});
    }
  }

  render(){
    const newArr = filterSortArray(this.state);
    return(
      <section>
        {/* break down in smaller component for each sort / filtering etc */}
        <div className="columns is-multiline is-desktop">
          <div className="column is-one-quarter-desktop">
            <div className="is-italic" onClick={this.clearAll}><strong>Clear all filters</strong></div>
            {/* Component to filter by brand or product */}
            <BrandProductSearch
              handleSearch={this.handleSearch}
            />
            {/* Component to sort by brand or price */}
            <SortingPriceBrand
              handleSort={this.handleSort}
              selectedRadio={this.state.selectedRadio}
            />
            {/* filtering by price, occasion or color */}
            <Filtering
              handleSearch={this.handleSearch}
              filter={this.state.filter}
              handleFilter={this.handleFilter}
              handleFilterColor={this.handleFilterColor} filterColor={this.state.filterColor}
            />
          </div>

          <div className="column is-three-quarters-desktop">
            {/* Navbar showing category title and nb of results */ }
            <Navbar newArr={newArr} parsedUrlQuery={this.state.parsedUrlQuery}/>
            {/* Result display */}
            <ResultDisplay newArr={newArr}/>
          </div>
        </div>
      </section>
    );
  }
}

export default IndexRoute;
