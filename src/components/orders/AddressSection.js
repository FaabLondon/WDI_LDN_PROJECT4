import React from 'react';

class AddressSection extends React.Component {

  render() {
    return (
      <div>
        <h5 className="subtitle is-size-5 is-italic"><strong>1) Please enter your Delivery/billing information</strong></h5>
        <div className="field">
          <label className="label" htmlFor="deliveryBillingAddress">Street & number</label>
          <div className="control has-icons-left">
            <input
              className="input"
              placeholder="Enter your street and number"
              name="deliveryBillingAddress"
              onChange={this.props.handleChange}
            />
            <span className="icon is-small is-left"><i className="fas fa-home"></i></span>
          </div>
          {this.props.errors.deliveryBillingAddress && <small>{this.props.errors.deliveryBillingAddress}</small>}
        </div>

        <div className="field">
          <label className="label" htmlFor="deliveryBillingPostcode">Postcode</label>
          <div className="control has-icons-left">
            <input
              className="input"
              placeholder="Enter your postcode"
              name="deliveryBillingPostcode"
              onChange={this.props.handleChange}
            />
            <span className="icon is-small is-left"><i className="fas fa-home"></i></span>
          </div>
          {this.props.errors.deliveryBillingPostcode && <small>{this.props.errors.deliveryBillingPostcode}</small>}
        </div>

        <div className="field">
          <label className="label" htmlFor="deliveryBillingCity">City</label>
          <div className="control has-icons-left">
            <input
              className="input"
              placeholder="Enter your city"
              name="deliveryBillingCity"
              onChange={this.props.handleChange}
            />
            <span className="icon is-small is-left"><i className="fas fa-home"></i></span>
          </div>
          {this.props.errors.deliveryBillingCity && <small>{this.props.errors.deliveryBillingCity}</small>}
        </div>

      </div>
    );
  }
}

export default AddressSection;
