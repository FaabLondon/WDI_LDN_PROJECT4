import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Cart from '../../lib/Cart';

import '../../scss/components/showCartRoute.scss';

class ShowCartRoute extends React.Component{

  state = {
    items: []
  }

  componentDidMount= () => {
    axios({
      method: 'GET',
      url: '/api/cart',
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => {
        //generates array of unique Ids
        const uniqueIdArr = Array.from(new Set(res.data.map(item => item._id)));
        let objCountIds = {};
        //creates an array of object/items that counts how many times an item is in the shopping cart and adds all info from res.data to each object
        const newArrQtyId = uniqueIdArr.map(elt => {
          const qtyId = res.data.filter(item => item._id === elt ).length;
          const foundElt = res.data.find(item => item._id === elt);
          return objCountIds = Object.assign({}, {qty: qtyId }, foundElt );
        });
        Cart.setCart(res.data); //should not have to do that as if no <a>, no page reload
        this.setState({items: newArrQtyId}, () => console.log(this.state));
      });
  }

  render() {
    return (
      <section>
        <div className="columns is-multiline">
          <div className="column is-two-third">
            <h2 className="title is-size-2">Your shopping bag <span><i className="fas fa-shopping-bag fa-1x"></i></span></h2>

            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Rental price</th>
                  <th>SubTotal</th>
                  <th>Delivery Options</th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map((item, i) =>
                  <tr key={i} className="cartContent">
                    <th>
                      <div className="imgItemCart" style={{background: `url(${item.mainImage})`, backgroundSize: 'cover'}}>
                      </div>
                    </th>
                    <td>
                      <h6 className="title is-size-6">{item.brand}</h6>
                      <h6 className="subtitle is-size-7">{item.shortDescription}</h6>
                      <h6 className="subtitle is-size-7">Size: {item.sizeAvailable}</h6>
                    </td>
                    <td>{item.qty}</td>
                    <td>£{item.rentalPrice} per day</td>
                    <td>£{item.rentalPrice} per day</td>
                    <td>
                      <h6 className="title is-size-6"><span><i className="fas fa-truck"></i></span>Delivery to UK</h6>
                      <h6 className="title is-size-6"><span><i className="fas fa-arrow-alt-circle-right"></i></span>Click & Collect</h6>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="column is-one-third image">
            <div className="imgRight"></div>
          </div>
        </div>
      </section>
    );
  }
}

export default ShowCartRoute;
