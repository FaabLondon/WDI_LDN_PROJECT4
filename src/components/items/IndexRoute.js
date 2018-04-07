import React from 'react';
import axios from 'axios';
import '../../scss/components/IndexPage.scss';
import _ from 'lodash';

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
  {color: 'Brown', code: '#994c00'},
  {color: 'Red', code: '#ff0000'},
  {color: 'Orange', code: '#ff8000'},
  {color: 'Yellow', code: '#ffff00'},
  {color: 'Green', code: '#006600'},
  {color: 'Blue', code: '#0000ff'},
  {color: 'Purple', code: '#990099'},
  {color: 'Pink', code: '#FF99CC'}
];

class IndexRoute extends React.Component{

  state = {
    items: [],
    query: '',
    sortBy: 'rentalPrice',
    sortDirection: 'desc',
    selectedRadio: 'rentalPrice|desc',
    filter: {
      'Daytime': false,
      'Work': false,
      'Weekend': false,
      'Vacation': false,
      'Formal': false,
      'Party': false,
      'Maternity': false
    },
    filterColor: {
      'black': false,
      'grey': false,
      'white': false,
      'beige': false,
      'brown': false,
      'red': false,
      'orange': false,
      'yellow': false,
      'green': false,
      'blue': false,
      'purple': false,
      'pink': false
    }
  }

  handleSearch = (e) => {
    this.setState({ query: e.target.value }, console.log(this.state));
  }

  handleSort = (e) => {
    //split the value of selected checkbox to get sorting field and direction (asc or desc)
    const selectedRadio = e.target.value;
    const [sortBy, sortDirection] = selectedRadio.split('|');
    this.setState({ sortBy, sortDirection, selectedRadio }, () => console.log(this.state));
  }

  handleFilter = (e) => {
    const filterBool = this.state.filter[e.target.value];
    //toggle boolean on checked box and recreate filter object
    const filter = Object.assign({}, this.state.filter, {[e.target.value]: !filterBool });
    this.setState({ filter }, () => console.log(this.state));
  }

  handleFilterColor = (e) => {
    const filterBool = this.state.filterColor[e.target.value];
    //toggle boolean on checked box and recreate filter object
    const filterColor = Object.assign({}, this.state.filterColor, {[e.target.value]: !filterBool });
    this.setState({ filterColor }, () => console.log(this.state));
  }


  SearchFilterSorting = () => {
    const { sortBy, sortDirection, query } = this.state;
    //create new regex to test seach query on brand name and product description
    const regex = new RegExp(query, 'i'); //case insensitive
    //1) sort items in asc or desc order
    let filtered = _.orderBy(this.state.items, [sortBy], [sortDirection] );

    //2) search on brand and product description with query string
    filtered = _.filter(filtered, (item) => regex.test(item.brand) || regex.test(item.shortDescription));

    //3) filter with checkboxes - extract criteria set at true
    const filterCriteria = _.filter(Object.keys(this.state.filter), (criterion) => this.state.filter[criterion] === true );
    const filterCriteriaColor = _.filter(Object.keys(this.state.filterColor), (criterion) => this.state.filterColor[criterion] === true );
    //only fitler if at least one checkbox is checked, otherwise no result displayed...
    if(filterCriteria.length === 0 && filterCriteriaColor.length === 0) return filtered;
    //filter items that have occasions or colors including at least one filter criterion
    filtered = _.filter(filtered, (item) => item.occasion.some(elt => filterCriteria.includes(elt)) || item.colors.some(elt => filterCriteriaColor.includes(elt)));
    return filtered;
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

            {/* query string on brand or product description */}
            <div className="searchBy">
              <h3 className="subtitle is-3 is-italic">Search</h3>
              <form>
                <div className="field SearchByControl">
                  <div className="control has-icons-left">
                    <input className="searchField has-text-centered" type="text" name="Search" placeholder="Search by brand or product description" onChange={this.handleSearch} />
                    <span className="icon is-small is-left"><i className="fas fa-search"></i></span>
                  </div>
                </div>
              </form>
            </div>

            {/* Radio button to Sort asc/desc by price or brand */}
            <div className="sortBy">
              <h3 className="subtitle is-3 is-italic">Sort by</h3>
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

            {/* Filter by one or more occasions */}
            <div className="FilterBy">
              <h3 className="subtitle is-3 is-italic">Filters</h3>
              <h5 className="subtitle is-5 is-italic">Occasion</h5>
              <form>
                <div className="control FilterByControl">
                  {Object.keys(this.state.filter).map((elt, i) =>
                    <label key={i} className="checkbox">
                      <input type="checkbox" value={elt} onChange={this.handleFilter} />
                      {elt}
                    </label>
                  )}
                </div>
              </form>
            </div>

            {/* Filter by one or more colors */}
            <div className="FilterBy">
              <h5 className="subtitle is-5 is-italic">Colors</h5>
              <form>
                <div className="control FilterByControl">
                  {colors.map((color, i) =>
                    <label key={i} className="container">
                      <input className="checkbox" type="checkbox" value={color.color} onChange={this.handleFilterColor} />
                      <span className="checkmark" style={{backgroundColor: `${color.code}`}}></span>
                    </label>
                  )}
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
