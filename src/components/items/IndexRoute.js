import React from 'react';
import axios from 'axios';
import '../../scss/components/IndexPage.scss';

//I installed this query String parsing library to parse the query in URL
const queryString = require('query-string');

class IndexRoute extends React.Component{

  state = {
    items: []
  }

  componentDidMount(){
    const parsedQuery = queryString.parse(this.props.location.search);
    axios.get('/api/items', {params: parsedQuery})
      .then(res => this.setState({items: res.data}, () => console.log(this.state)));
  }

  render(){
    return(
      <section>
        <div className="columns is-multiline">
          <div className="column is-one-quarter">
            Placeholder for sort and filter
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


            <div className="columns is-multiline">
              {this.state.items.map((item, i) =>
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
