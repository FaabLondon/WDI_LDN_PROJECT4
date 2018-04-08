import React from 'react';
import axios from 'axios';

class ShowRouteCart extends React.Component{

  state = {
    items: []
  }

  componentDidMount= () => {
    axios.get('/api/cart')
      then(res => this.setState({items: res.data}), () => console.log(this.state))
  }



  render() {
    return (
      <section>
        <div className="columns is-multiline">
          <div className="column">
            <ul>
              <li></li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default ShowRouteCart;
