import React from 'react';

class AddressSection extends React.Component {

  render() {
    return (
      <div className="column is-half">
        <h5 className="subtitle is-size-5 is-italic"><strong>1) Please enter your Delivery address</strong></h5>
        <div className="field">
          <label className="label" htmlFor="deliveryAddress">Street & number</label>
          <div className="control has-icons-left">
            <input
              className="input"
              placeholder="Enter your street and number"
              name="deliveryAddress"
              onChange={this.props.handleChange}
              required
            />
            <span className="icon is-small is-left"><i className="fas fa-home"></i></span>
          </div>
          {this.props.errors.deliveryAddress && <small>{this.props.errors.deliveryAddress}</small>}
        </div>
        <div className="field">
          <label className="label" htmlFor="deliveryPostcode">Postcode</label>
          <div className="control has-icons-left">
            <input
              className="input"
              placeholder="Enter your postcode"
              name="deliveryPostcode"
              onChange={this.props.handleChange}
              required
            />
            <span className="icon is-small is-left"><i className="fas fa-home"></i></span>
          </div>
          {this.props.errors.deliveryPostcode && <small>{this.props.errors.deliveryPostcode}</small>}
        </div>
        <div className="field">
          <label className="label" htmlFor="deliveryCity">City</label>
          <div className="control has-icons-left">
            <input
              className="input"
              placeholder="Enter your city"
              name="deliveryCity"
              onChange={this.props.handleChange}
              required
            />
            <span className="icon is-small is-left"><i className="fas fa-home"></i></span>
          </div>
          {this.props.errors.deliveryCity && <small>{this.props.errors.deliveryCity}</small>}
        </div>

        <h5 className="subtitle is-size-5 is-italic"><strong>2) Please enter your Billing address</strong></h5>
        <div className="field">
          <label className="label" htmlFor="billingAddress">Street & number</label>
          <div className="control has-icons-left">
            <input
              className="input"
              placeholder="Enter your street and number"
              name="billingAddress"
              onChange={this.props.handleChange}
              required
            />
            <span className="icon is-small is-left"><i className="fas fa-home"></i></span>
          </div>
          {this.props.errors.billingAddress && <small>{this.props.errors.billingAddress}</small>}
        </div>
        <div className="field">
          <label className="label" htmlFor="billingPostcode">Postcode</label>
          <div className="control has-icons-left">
            <input
              className="input"
              placeholder="Enter your postcode"
              name="billingPostcode"
              onChange={this.props.handleChange}
              required
            />
            <span className="icon is-small is-left"><i className="fas fa-home"></i></span>
          </div>
          {this.props.errors.billingPostcode && <small>{this.props.errors.billingPostcode}</small>}
        </div>
        <div className="field">
          <label className="label" htmlFor="billingCity">City</label>
          <div className="control has-icons-left">
            <input
              className="input"
              placeholder="Enter your city"
              name="billingCity"
              onChange={this.props.handleChange}
              required
            />
            <span className="icon is-small is-left"><i className="fas fa-home"></i></span>
          </div>
          {this.props.errors.billingCity && <small>{this.props.errors.billingCity}</small>}
        </div>
      </div>
    );
  }
}

export default AddressSection;
