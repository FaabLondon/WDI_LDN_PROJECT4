import React from 'react';
import axios from 'axios';
import '../../scss/components/IndexPage.scss';
import _ from 'lodash';

//I installed this query String parsing library to parse the query in URL
const queryString = require('query-string');

class IndexRoute extends React.Component{

  state = {
    items: [],
    query: '',
    sortBy: 'rentalPrice',
    sortDirection: 'desc'
  }

  handleSearch = (e) => {
    this.setState({ query: e.target.value }, console.log(this.state));
  }

  handleSort = (e) => {
    //split the value of selected checkbox to get sorting field and direction (asc or desc)
    const [sortBy, sortDirection] = e.target.value.split('|');
    this.setState({ sortBy, sortDirection }, () => console.log(this.state));
  }

  SearchFilterSorting = () => {
    const { sortBy, sortDirection, query } = this.state;
    //create new regex to test seach query on brand name and product description
    const regex = new RegExp(query, 'i'); //case insensitive
    //sort search result in asc or desc order
    const filtered = _.orderBy(this.state.items, [sortBy], [sortDirection] );
    //search
    return (_.filter(filtered, (item) => regex.test(item.brand) || regex.test(item.shortDescription)));
  }

  componentDidMount(){
    //parses the search query
    const parsedQuery = queryString.parse(this.props.location.search);
    console.log(parsedQuery);
    axios.get('/api/items', {params: parsedQuery})
      .then(res => this.setState({items: res.data}, () => console.log(this.state)));
  }

  render(){
    return(
      <section>
        <div className="columns is-multiline">
          <div className="column is-one-quarter">
            <div className="searchBy">
              <h3 className="subtitle is-3 is-italic">Search</h3>
              <form>
                <div className="field SearchByControl">
                  <label className="label">
                    <input type="text" name="Search" placeholder="Search by brand or product description" onChange={this.handleSearch} />
                  </label>
                </div>
              </form>
            </div>
            <div className="sortBy">
              <h3 className="subtitle is-3 is-italic">Sort by</h3>
              <form>
                <div className="control SortByControl">
                  <label className="radio">
                    <input type="radio" name="HighLow" value="rentalPrice|desc" onChange={this.handleSort} />
                    High $ - Low $
                  </label>
                  <label className="radio">
                    <input type="radio" name="HighLow" value="rentalPrice|asc" onChange={this.handleSort} />
                    Low $ - High $
                  </label>
                  <label className="radio">
                    <input type="radio" name="AtoZ" value="brand|asc" onChange={this.handleSort} />
                    Brand Name (A - Z)
                  </label>
                  <label className="radio">
                    <input type="radio" name="AtoZ" value="brand|desc" onChange={this.handleSort} />
                    Brand Name (Z - A)
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div className="column is-three-quarter">

            {/* Navbar showing category title and nb of results */}
            <nav className="navbar">
              <div className="navbar-menu">
                <div className="navbar-start">
                  Placeholder shopping category (nb results)
                </div>
                <div className="navbar-end">
                  placeholder navigation buttons
                </div>
              </div>
            </nav>

            {/* Result display */}
            <div className="columns is-multiline">
              {this.SearchFilterSorting().map((item, i) =>
                <div key={i} className="column is-one-third">
                  <div className="card">
                    <div
                      style={{backgroundImage: `url(${item.mainImage})`, backgroundSize: 'cover'}} className="card-image">
                    </div>
                    <div className="card-content">
                      <div className="content">
                        <h6 className="title is-6">{item.brand}</h6>
                        <h6 className="subtitle is-7">{item.shortDescription}</h6>
                        <h6 className="subtitle is-7">£{item.rentalPrice} per day <span className="has-text-grey">| £{item.retailPrice} retail</span></h6>
                      </div>
                    </div>
                  </div>
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
